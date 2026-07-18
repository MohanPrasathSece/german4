import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";
import TypewriterText from "./TypewriterText";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background overflow-hidden relative">
      <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-sm">
          {/* Brand & Address */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal>
              <h3 className="text-serif text-3xl lg:text-4xl font-bold mb-6 transition-colors">VERTEX IQ</h3>

              <div className="space-y-2 mt-6">
                <p className="text-sans text-xs font-bold text-background/40 uppercase tracking-[0.2em]">Contact & Hours</p>
                <p className="text-sans text-sm text-background/80">Support@vertexiq.com</p>
                <p className="text-sans text-sm text-background/60">24/7 Crypto Support</p>
              </div>
            </ScrollReveal>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 lg:col-start-6">
            <ScrollReveal delay={0.1}>
              <h4 className="text-serif text-lg font-bold text-background mb-6">Menu</h4>
              <ul className="space-y-2">
                {[
                  { label: "Home", href: "/" },
                  { label: "Dashboard", href: "/crypto" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sans text-sm text-background/60 hover:text-background transition-all hover:translate-x-1 inline-block"
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          {/* Legal */}
          <div className="lg:col-span-2">
            <ScrollReveal delay={0.15}>
              <h4 className="text-serif text-lg font-bold text-background mb-6">Legal</h4>
              <ul className="space-y-2">
                {[
                  { label: "Privacy Policy", href: "/privacy-policy" },
                  { label: "Terms & Conditions", href: "/terms-and-conditions" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sans text-sm text-background/60 hover:text-background transition-all hover:translate-x-1 inline-block"
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          {/* Practice Areas -> Crypto */}
          <div className="lg:col-span-3">
            <ScrollReveal delay={0.2}>
              <h4 className="text-serif text-lg font-bold text-background mb-6">Resources</h4>
              <ul className="space-y-2">
                {["Blockchain Basics", "Crypto Investing", "Market Analysis", "Security"].map((area) => (
                  <li key={area}>
                    <span className="text-sans text-sm text-background/60 hover:text-background cursor-pointer transition-all hover:translate-x-1 inline-block">{area}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>

        {/* Big Text */}
        <div className="border-t border-background/10 mt-16 pt-12 relative overflow-hidden">
          <div className="flex justify-center lg:justify-start pointer-events-none">
            <TypewriterText text="VERTEX IQ" className="text-[15vw] sm:text-[14vw] lg:text-[12vw] leading-none font-serif font-bold text-background/90 tracking-[0.1em] sm:tracking-[0.2em] opacity-10 select-none whitespace-nowrap" />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-background/40">
          <p>© {currentYear} Vertex IQ - All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <p>
              Developed by <a href="https://www.zyradigitals.com" target="_blank" rel="noopener noreferrer" className="text-background/60 hover:text-background transition-colors font-medium">Zyra Digitals</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
