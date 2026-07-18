import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import TypewriterText from "./TypewriterText";

const areas = [
  { title: "Corporate Law", num: "01", desc: "Strategic counsel for business formation, M&A, governance, and complex commercial transactions." },
  { title: "Civil Litigation", num: "02", desc: "Skilled advocacy in disputes — from negotiation and mediation to courtroom representation." },
  { title: "Criminal Law", num: "03", desc: "Expert criminal defence services. Protecting your rights with experienced legal defence." },
  { title: "Property & Real Estate", num: "04", desc: "Comprehensive guidance on acquisitions, title disputes, leasing, and regulatory compliance." },
  { title: "Family Law", num: "05", desc: "Compassionate and strategic support through custody, divorce, and family disputes." },
  { title: "Intellectual Property", num: "06", desc: "Protecting your innovations, trademarks, patents, and creative works in a digital world." },
];

const PracticeAreas = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="bg-background py-28 lg:py-40">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 mb-20 lg:mb-28">
          <ScrollReveal className="lg:col-span-4">
            <p className="text-sans text-label uppercase text-muted-foreground mb-4">What We Do</p>
            <div className="text-serif text-5xl lg:text-6xl font-bold text-foreground overflow-hidden">
              <TypewriterText text="Practice" />
              <TypewriterText text="Areas" delay={0.3} />
            </div>
          </ScrollReveal>
          <ScrollReveal className="lg:col-span-6 lg:col-start-7 flex items-end" delay={0.15}>
            <p className="text-sans text-body-lg text-muted-foreground max-w-lg">
              We offer comprehensive legal services across six core practice areas, each backed by deep expertise and a commitment to exceptional outcomes.
            </p>
          </ScrollReveal>
        </div>

        <div>
          {areas.map((area, i) => (
            <ScrollReveal key={area.title} delay={i * 0.04}>
              <div
                className="group border-t border-border last:border-b cursor-pointer"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="flex items-center justify-between py-7 lg:py-9">
                  <div className="flex items-center gap-6 lg:gap-12 flex-1">
                    <span className="text-sans text-label text-muted-foreground/50 w-8">{area.num}</span>
                    <h3 className="text-serif text-heading font-semibold text-foreground group-hover:translate-x-2 transition-transform duration-500">
                      {area.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-6">
                    <motion.p
                      initial={false}
                      animate={{
                        opacity: hoveredIndex === i ? 1 : 0,
                        width: hoveredIndex === i ? "auto" : 0,
                      }}
                      transition={{ duration: 0.2 }}
                      className="text-sans text-sm text-muted-foreground max-w-xs hidden lg:block overflow-hidden whitespace-nowrap"
                    >
                      {area.desc}
                    </motion.p>
                    <motion.div
                      initial={false}
                      animate={{
                        rotate: hoveredIndex === i ? 0 : -45,
                        opacity: hoveredIndex === i ? 1 : 0.3,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowUpRight className="w-5 h-5 text-foreground" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PracticeAreas;
