import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const NUM_CANDLES = 40;

interface Candle {
  id: number;
  open: number;
  close: number;
  high: number;
  low: number;
}

const generateInitialCandles = (): Candle[] => {
  const candles: Candle[] = [];
  let currentPrice = 50;
  for (let i = 0; i < NUM_CANDLES; i++) {
    const change = (Math.random() - 0.5) * 10;
    const open = currentPrice;
    const close = open + change;
    const high = Math.max(open, close) + Math.random() * 5;
    const low = Math.min(open, close) - Math.random() * 5;
    candles.push({ id: i, open, close, high, low });
    currentPrice = close;
  }
  return candles;
};

const TradingCandles = () => {
  const [candles, setCandles] = useState<Candle[]>([]);

  useEffect(() => {
    setCandles(generateInitialCandles());

    const interval = setInterval(() => {
      setCandles((prev) => {
        const newCandles = [...prev];
        const lastCandle = newCandles[newCandles.length - 1];
        
        // Sometimes just update the last candle
        if (Math.random() > 0.3) {
          const change = (Math.random() - 0.5) * 4;
          const newClose = lastCandle.close + change;
          newCandles[newCandles.length - 1] = {
            ...lastCandle,
            close: newClose,
            high: Math.max(lastCandle.high, newClose),
            low: Math.min(lastCandle.low, newClose)
          };
        } else {
          // Add a new candle and remove the first
          newCandles.shift();
          const change = (Math.random() - 0.5) * 8;
          const open = lastCandle.close;
          const close = open + change;
          const high = Math.max(open, close) + Math.random() * 5;
          const low = Math.min(open, close) - Math.random() * 5;
          newCandles.push({ id: Date.now(), open, close, high, low });
        }
        
        return newCandles;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Find min and max to scale chart
  const minLow = Math.min(...candles.map((c) => c.low));
  const maxHigh = Math.max(...candles.map((c) => c.high));
  const range = maxHigh - minLow || 1;

  const getY = (val: number) => {
    return 100 - ((val - minLow) / range) * 100; // Percentage from top
  };

  return (
    <div className="relative w-full aspect-video lg:aspect-square bg-black/40 border border-border rounded-xl overflow-hidden shadow-2xl p-4 flex items-end">
      {/* Background Grid */}
      <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-10 pointer-events-none">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="border-[0.5px] border-white/50" />
        ))}
      </div>

      <div className="relative w-full h-full flex items-end justify-between gap-1 overflow-hidden">
        {candles.map((candle, i) => {
          const isGreen = candle.close >= candle.open;
          const top = getY(Math.max(candle.open, candle.close));
          const bottom = getY(Math.min(candle.open, candle.close));
          const height = Math.max(0.5, bottom - top);
          const highY = getY(candle.high);
          const lowY = getY(candle.low);
          const wickHeight = lowY - highY;

          return (
            <motion.div 
              key={candle.id}
              layout
              transition={{ type: "tween", duration: 0.1 }}
              className="relative flex-1 h-full flex items-center justify-center group"
            >
              {/* Wick */}
              <div 
                className={`absolute w-[1px] ${isGreen ? 'bg-green-500' : 'bg-red-500'}`}
                style={{ top: `${highY}%`, height: `${wickHeight}%` }}
              />
              {/* Body */}
              <div 
                className={`absolute w-full max-w-[12px] rounded-[1px] ${isGreen ? 'bg-green-500' : 'bg-red-500'}`}
                style={{ top: `${top}%`, height: `${height}%` }}
              />
            </motion.div>
          );
        })}
      </div>
      
      {/* Overlay Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-xs font-bold text-white/70 font-mono">LIVE BTC/USD</span>
      </div>
    </div>
  );
};

export default TradingCandles;
