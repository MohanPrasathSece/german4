
import { motion } from "framer-motion";
import { Scale, Users } from "lucide-react";

interface NewHeroProps {
    onScrollToTools: () => void;
    onScrollToCitizen: () => void;
}

const NewHero = ({ onScrollToTools, onScrollToCitizen }: NewHeroProps) => {
    return (
        <section className="relative min-h-[80vh] flex flex-col justify-center items-center bg-surface-dark overflow-hidden pt-48 pb-24">
            {/* Background gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent opacity-50" />

            <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-sans text-label uppercase text-surface-charcoal-foreground/60 mb-6 tracking-widest"
                >
                    Welcome to Vakalt
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-serif text-5xl md:text-7xl lg:text-8xl font-bold text-surface-dark-foreground mb-16 leading-tight"
                >
                    Are you?
                </motion.h1>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                    <motion.button
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        onClick={onScrollToTools}
                        className="group relative w-full md:w-64 h-40 rounded-2xl bg-surface-charcoal/50 border border-border/10 hover:bg-surface-charcoal hover:border-surface-dark-foreground/20 transition-all duration-500 flex flex-col items-center justify-center gap-4 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <Scale className="w-10 h-10 text-surface-dark-foreground/80 group-hover:text-surface-dark-foreground group-hover:scale-110 transition-all duration-500" />
                        <span className="text-serif text-2xl font-bold text-surface-dark-foreground relative z-10">
                            A Lawyer
                        </span>
                        <span className="text-sans text-xs uppercase tracking-wider text-surface-charcoal-foreground/60 group-hover:text-surface-dark-foreground/80 transition-colors">
                            Explore Legal Tools
                        </span>
                    </motion.button>

                    <motion.button
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        onClick={onScrollToCitizen}
                        className="group relative w-full md:w-64 h-40 rounded-2xl bg-surface-charcoal/50 border border-border/10 hover:bg-surface-charcoal hover:border-surface-dark-foreground/20 transition-all duration-500 flex flex-col items-center justify-center gap-4 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <Users className="w-10 h-10 text-surface-dark-foreground/80 group-hover:text-surface-dark-foreground group-hover:scale-110 transition-all duration-500" />
                        <span className="text-serif text-2xl font-bold text-surface-dark-foreground relative z-10">
                            Not a Lawyer
                        </span>
                        <span className="text-sans text-xs uppercase tracking-wider text-surface-charcoal-foreground/60 group-hover:text-surface-dark-foreground/80 transition-colors">
                            Citizen Services
                        </span>
                    </motion.button>
                </div>
            </div>
        </section>
    );
};

export default NewHero;
