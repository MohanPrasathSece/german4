import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";

const tools = [
  {
    title: "Delhi Court Fee Calculator",
    desc: "Instantly estimate Delhi court fees based on Ad Valorem rules and claim value.",
    status: "Available Now",
  },
  {
    title: "Legal Document Checklist",
    desc: "Comprehensive checklists to ensure your filings and submissions are complete.",
    status: "Coming Soon",
  },
  {
    title: "Case Preparation Guide",
    desc: "Structured frameworks to help organize your legal strategy and evidence.",
    status: "Coming Soon",
  },
];

const ToolsPreview = () => {
  return (
    <section className="bg-surface-charcoal py-28 lg:py-40">
      <div className="container mx-auto px-6 lg:px-12">
        <ScrollReveal>
          <p className="text-sans text-label uppercase text-surface-charcoal-foreground/50 mb-4">Resources</p>
          <h2 className="text-serif text-display-sm font-bold text-surface-dark-foreground mb-16 lg:mb-24">
            Legal Tools
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {tools.map((tool, i) => (
            <ScrollReveal key={tool.title} delay={i * 0.1}>
              <Link
                to="/tools"
                className="group block bg-surface-dark p-8 lg:p-10 hover:bg-foreground hover:text-background transition-all duration-700 h-full flex flex-col"
              >
                <p className="text-sans text-label uppercase text-surface-charcoal-foreground/40 group-hover:text-background/50 mb-8 transition-colors duration-700">
                  {tool.status}
                </p>
                <h3 className="text-serif text-subheading font-semibold text-surface-dark-foreground group-hover:text-background mb-4 transition-colors duration-700">
                  {tool.title}
                </h3>
                <p className="text-sans text-body text-surface-charcoal-foreground/50 group-hover:text-background/60 mb-8 flex-1 transition-colors duration-700">
                  {tool.desc}
                </p>
                <ArrowUpRight className="w-5 h-5 text-surface-charcoal-foreground/30 group-hover:text-background group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsPreview;
