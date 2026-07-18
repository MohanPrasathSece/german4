import ScrollReveal from "./ScrollReveal";
import { Scale, Shield, Eye } from "lucide-react";
import TypewriterText from "./TypewriterText";

const values = [
  { icon: Scale, title: "Clarity", desc: "We translate complex legal language into clear, actionable strategies." },
  { icon: Shield, title: "Strategy", desc: "Every case is approached with a tailored, results-driven methodology." },
  { icon: Eye, title: "Transparency", desc: "Honest communication and predictable costs at every stage." },
];

const BrandStory = () => {
  return (
    <section className="bg-background py-28 lg:py-40 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24 lg:mb-32">
          <ScrollReveal>
            <p className="text-sans text-label uppercase text-muted-foreground/50 mb-6">Our Philosophy</p>
            <div className="text-serif text-5xl lg:text-7xl font-bold text-foreground leading-tight">
              <TypewriterText text="Law should empower," />
              <div className="mt-2">
                <span className="font-normal opacity-80">not intimidate.</span>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-sans text-body-lg text-muted-foreground leading-relaxed">
              VAKALT was founded on a simple premise: legal representation should be accessible, transparent, and effective. We simplify litigation through modern thinking, rigorous strategy, and a deep commitment to our clients' success.
            </p>
            <p className="text-sans text-body text-muted-foreground/80 leading-relaxed mt-6">
              Our team combines decades of courtroom experience with a forward-thinking approach to legal practice. We believe that informed clients make better decisions — and better decisions lead to better outcomes.
            </p>
          </ScrollReveal>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px">
          {values.map((v, i) => (
            <ScrollReveal key={v.title} delay={i * 0.1}>
              <div className="bg-surface-offwhite p-10 lg:p-14 group hover:bg-muted transition-colors duration-500">
                <v.icon className="w-6 h-6 text-muted-foreground/40 mb-8 group-hover:text-foreground transition-colors duration-500" />
                <h3 className="text-serif text-subheading font-semibold text-foreground mb-4">
                  {v.title}
                </h3>
                <p className="text-sans text-body text-muted-foreground/60">
                  {v.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
