import { motion } from "framer-motion";

const Ticker = ({ text = "LITIGATION • REFORMED • JUSTICE • SIMPLIFIED • VAKALT • " }: { text?: string }) => {
    return (
        <div className="w-full overflow-hidden bg-surface-dark py-6 border-y border-white/10">
            <div className="flex whitespace-nowrap">
                <motion.div
                    animate={{ x: [0, -1000] }}
                    transition={{
                        repeat: Infinity,
                        duration: 20,
                        ease: "linear",
                    }}
                    className="flex gap-4"
                >
                    {[...Array(8)].map((_, i) => (
                        <span
                            key={i}
                            className="text-4xl lg:text-8xl font-serif text-white font-bold px-4"
                        >
                            {text}
                        </span>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Ticker;
