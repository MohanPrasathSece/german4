import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";

const ContactCTA = () => {
  return (
    <section className="bg-surface-dark py-32 lg:py-48 relative overflow-hidden">
      {/* Large decorative text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-serif font-bold text-[15vw] lg:text-[12vw] text-surface-charcoal/30 leading-none">
          VAKALT
        </span>
      </div>

      <div className="relative container mx-auto px-6 lg:px-12 text-center">
        <ScrollReveal>
          <p className="text-sans text-label uppercase text-surface-charcoal-foreground/50 mb-8">
            Take The First Step
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="text-serif text-display font-bold text-surface-dark-foreground mb-6">
            Need Legal<br />
            <span className="font-normal">Guidance?</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="text-sans text-body-lg text-surface-charcoal-foreground/50 max-w-lg mx-auto mb-14 leading-relaxed">
            Schedule a confidential consultation. We provide clear, strategic legal counsel tailored to your specific situation.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <Link
            to="/contact"
            className="inline-block text-sans text-[10px] font-bold uppercase tracking-[0.15em] bg-surface-dark-foreground text-surface-dark px-10 py-3.5 rounded-full hover:bg-zinc-200 transition-all duration-500"
          >
            Schedule Consultation
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ContactCTA;
