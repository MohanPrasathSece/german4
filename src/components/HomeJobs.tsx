
import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";
import { Briefcase } from "lucide-react";

const HomeJobs = () => {
    return (
        <section className="bg-surface-dark border-t border-white/5 py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-surface-charcoal/30" />
            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <ScrollReveal>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-r from-surface-charcoal to-surface-dark border border-white/10 p-10 md:p-14 rounded-3xl">
                        <div className="max-w-2xl">
                            <div className="flex items-center gap-3 mb-4">
                                <Briefcase className="w-5 h-5 text-surface-charcoal-foreground/60" />
                                <span className="text-sans text-xs font-bold uppercase tracking-[0.2em] text-surface-charcoal-foreground/60">
                                    Opportunities
                                </span>
                            </div>
                            <h2 className="text-serif text-3xl md:text-4xl font-bold text-surface-dark-foreground mb-4">
                                Find Jobs or Internships
                            </h2>
                            <p className="text-sans text-body text-surface-charcoal-foreground/60 max-w-lg">
                                Discover diverse career opportunities across India. Find your next role in leading organizations and companies nationwide.
                            </p>
                        </div>

                        <Link
                            to="/careers"
                            className="whitespace-nowrap px-8 py-4 rounded-full bg-white text-surface-dark text-sm font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors"
                        >
                            View Opportunities
                        </Link>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default HomeJobs;
