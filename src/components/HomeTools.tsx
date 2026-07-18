
import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";
import { Calculator, FileText, Building, Search, Gavel, ArrowRight } from "lucide-react";

const tools = [
    {
        title: "Delhi Court Fee Calculator",
        desc: "Calculate court fees based on Ad Valorem rules.",
        icon: Calculator,
        link: "/tools/court-fee-calculator",
    },
    {
        title: "Legal Drafts Library",
        desc: "Download ready-made legal templates and documents.",
        icon: FileText,
        link: "/tools/legal-drafts",
    },
    {
        title: "Police Stations Info",
        desc: "Directory of police stations and jurisdictional courts.",
        icon: Building,
        link: "/tools/police-stations",
    },
    {
        title: "Case Status Search",
        desc: "Track your case status across various courts instantly.",
        icon: Search,
        link: "/tools/case-status", // Placeholder
    },
    {
        title: "Find Acts & Rules",
        desc: "Access comprehensive database of Bare Acts and Rules.",
        icon: Gavel,
        link: "/tools/acts", // Placeholder
    },
];

const HomeTools = () => {
    return (
        <section id="legal-tools" className="bg-surface-charcoal py-24 lg:py-32 relative">
            <div className="container mx-auto px-6 lg:px-12">
                <ScrollReveal>
                    <div className="mb-16 text-center">
                        <span className="text-sans text-xs font-bold uppercase tracking-[0.2em] text-surface-charcoal-foreground/40 mb-4 block">
                            For Legal Professionals
                        </span>
                        <h2 className="text-serif text-4xl lg:text-5xl font-bold text-surface-dark-foreground">
                            Explore Legal Tools
                        </h2>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tools.map((tool, i) => (
                        <ScrollReveal key={tool.title} delay={i * 0.1}>
                            <Link
                                to={tool.link}
                                className="group block h-full bg-surface-dark border border-white/5 p-8 rounded-xl hover:bg-surface-charcoal-foreground/5 hover:border-white/10 transition-all duration-300"
                            >
                                <div className="w-12 h-12 rounded-full bg-surface-charcoal flex items-center justify-center mb-6 text-surface-dark-foreground group-hover:scale-110 transition-transform duration-300">
                                    <tool.icon size={20} />
                                </div>
                                <h3 className="text-serif text-xl font-medium text-surface-dark-foreground mb-3 group-hover:text-white transition-colors">
                                    {tool.title}
                                </h3>
                                <p className="text-sans text-sm text-surface-charcoal-foreground/60 leading-relaxed mb-6">
                                    {tool.desc}
                                </p>
                                <div className="flex items-center text-xs font-bold uppercase tracking-wider text-surface-charcoal-foreground/40 group-hover:text-surface-dark-foreground transition-colors">
                                    Access Tool <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomeTools;
