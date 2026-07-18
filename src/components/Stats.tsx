import { useRef, useEffect } from "react";
import { motion, useInView, useSpring } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const stats = [
  { num: 500, label: "Cases Resolved", suffix: "+" },
  { num: 98, label: "Client Satisfaction", suffix: "%" },
  { num: 15, label: "Years Experience", suffix: "+" },
  { num: 6, label: "Practice Areas", suffix: "" },
];

const NumberTicker = ({ value }: { value: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });

  useEffect(() => {
    if (inView) {
      spring.set(value);
    }
  }, [inView, spring, value]);

  useEffect(() => {
    return spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString();
      }
    });
  }, [spring]);

  return <span ref={ref} />;
};

const Stats = () => {
  return (
    <section className="bg-surface-offwhite py-20 lg:py-28">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-border">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1} className="lg:px-12 first:lg:pl-0 last:lg:pr-0">
              <div className="text-center lg:text-left">
                <p className="text-serif text-display-sm font-bold text-foreground mb-2 flex items-center justify-center lg:justify-start">
                  <NumberTicker value={stat.num} />
                  <span>{stat.suffix}</span>
                </p>
                <p className="text-sans text-label uppercase text-muted-foreground">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
