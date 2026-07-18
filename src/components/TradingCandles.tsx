import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NUM_CANDLES = 50;

interface Candle {
  id: number;
  open: number;
  close: number;
  high: number;
  low: number;
}

const generateInitialCandles = (): Candle[] => {
  const candles: Candle[] = [];
  let currentPrice = 100;
  for (let i = 0; i < NUM_CANDLES; i++) {
    const change = (Math.random() - 0.45) * 8; // Slightly biased to go up
    const open = currentPrice;
    const close = open + change;
    const high = Math.max(open, close) + Math.random() * 6;
    const low = Math.min(open, close) - Math.random() * 6;
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
        
        // 70% chance to update the current candle
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
          const change = (Math.random() - 0.5) * 6;
          const open = lastCandle.close;
          const close = open + change;
          const high = Math.max(open, close) + Math.random() * 5;
          const low = Math.min(open, close) - Math.random() * 5;
          newCandles.push({ id: Date.now(), open, close, high, low });
        }
        
        return newCandles;
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  // Find min and max to scale chart
  const minLow = Math.min(...candles.map((c) => c.low));
  const maxHigh = Math.max(...candles.map((c) => c.high));
  // Add 10% padding top and bottom
  const padding = (maxHigh - minLow) * 0.1;
  const range = (maxHigh + padding) - (minLow - padding) || 1;

  const getY = (val: number) => {
    return 100 - ((val - (minLow - padding)) / range) * 100;
  };

  return (
    <div className="relative w-full aspect-video lg:aspect-square bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-6 flex items-end">
      {/* Background Grid */}
      <div className="absolute inset-0 grid grid-cols-5 grid-rows-4 opacity-[0.03] pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="border-[0.5px] border-black" />
        ))}
      </div>

      <div className="relative w-full h-full flex items-end justify-between gap-[2px] overflow-hidden">
        <AnimatePresence>
          {candles.map((candle, i) => {
            const isGreen = candle.close >= candle.open;
            const top = getY(Math.max(candle.open, candle.close));
            const bottom = getY(Math.min(candle.open, candle.close));
            const height = Math.max(0.5, bottom - top); // Body height
            const highY = getY(candle.high);
            const lowY = getY(candle.low);
            const wickHeight = lowY - highY; // Wick height

            // Clean, professional colors
            const colorClass = isGreen ? 'bg-[#00b060]' : 'bg-[#f4364c]';

            return (
              <motion.div 
                key={candle.id}
                layout
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ type: "tween", duration: 0.15 }}
                className="relative flex-1 h-full flex items-center justify-center group"
              >
                {/* Wick */}
                <div 
                  className={`absolute w-[1px] opacity-80 ${colorClass}`}
                  style={{ top: `${highY}%`, height: `${wickHeight}%` }}
                />
                {/* Body */}
                <div 
                  className={`absolute w-[80%] max-w-[8px] rounded-[1px] ${colorClass}`}
                  style={{ top: `${top}%`, height: `${height}%` }}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      
      {/* Overlay Gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-white/20 pointer-events-none" />
      
      {/* Current Price Line Tracker */}
      {candles.length > 0 && (
        <motion.div 
          layout
          className="absolute right-0 w-full flex items-center justify-end pointer-events-none z-10"
          style={{ top: `${getY(candles[candles.length - 1].close)}%` }}
        >
          <div className="h-[1px] w-full bg-gray-900/10 border-b border-dashed border-gray-900/20" />
          <div className="bg-gray-900 text-white text-[10px] font-mono font-bold px-2 py-1 rounded-l-md shadow-sm ml-[-4px]">
            {candles[candles.length - 1].close.toFixed(2)}
          </div>
        </motion.div>
      )}

      {/* Header Info */}
      <div className="absolute top-6 left-6 flex flex-col gap-1 z-20">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#00b060] animate-pulse shadow-[0_0_8px_rgba(0,176,96,0.8)]" />
          <span className="text-xs font-bold text-gray-900 font-sans tracking-wide">LIVE TRADING DATA</span>
        </div>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-2xl font-bold font-sans text-gray-900">BTC/USD</span>
          {candles.length > 0 && (
            <span className={`text-sm font-semibold ${candles[candles.length - 1].close >= candles[0].close ? 'text-[#00b060]' : 'text-[#f4364c]'}`}>
              {candles[candles.length - 1].close >= candles[0].close ? '+' : ''}
              {((candles[candles.length - 1].close - candles[0].close) / candles[0].close * 100).toFixed(2)}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TradingCandles;
