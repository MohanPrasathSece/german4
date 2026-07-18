import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

interface HeroProps {
  onScrollToTools?: () => void;
  onScrollToCitizen?: () => void;
}

const Hero = ({ onScrollToTools, onScrollToCitizen }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-start bg-black overflow-hidden pt-44 pb-24">
      {/* Background Texture */}
      <div className="absolute inset-0 pointer-events-none">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-[0.2] grayscale" />
        <div className="absolute inset-0 bg-black/95" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        {/* Top Branding (Subtle) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-6 flex items-center gap-3"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
          <span className="text-serif text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">
            Litigation Reformed
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
        </motion.div>

        {/* Direct Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 max-w-4xl"
        >
          <h1 className="text-serif text-3xl md:text-5xl lg:text-6xl font-extralight text-white/80 leading-[1.8] tracking-[0.05em]">
            Legal tools for professionals. <br className="hidden md:block" />
            Legal knowledge for everyone.
          </h1>
        </motion.div>

        {/* The Choice Prompt */}
        <div className="flex flex-col items-center gap-12">
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-serif text-5xl md:text-7xl lg:text-8xl italic font-light text-white tracking-tighter leading-none"
          >
            Are you?
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-8 pt-4"
          >
            <button
              onClick={onScrollToTools}
              className="group relative px-10 py-4 rounded-full bg-white text-black text-xs md:text-sm font-bold uppercase tracking-[0.3em] transition-all hover:scale-105 hover:bg-zinc-200"
            >
              <span className="flex items-center gap-3">
                A Lawyer <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </button>

            <button
              onClick={onScrollToCitizen}
              className="px-10 py-4 rounded-full border border-white/10 text-white text-xs md:text-sm font-bold uppercase tracking-[0.3em] transition-all hover:bg-white/5 hover:border-white"
            >
              Not a Lawyer
            </button>
          </motion.div>
        </div>
      </div>

      {/* Aesthetic Border Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </section>
  );
};

export default Hero;
