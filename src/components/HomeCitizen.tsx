
import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";
import { MessageSquare, UserCheck, BookOpen, ArrowRight } from "lucide-react";

const services = [
    {
        title: "Post a Query",
        desc: "Submit your legal questions and get answers from experts.",
        icon: MessageSquare,
        link: "/contact?type=query",
        action: "Ask Now"
    },
    {
        title: "Consult a Lawyer",
        desc: "Book a personal consultation with experienced advocates.",
        icon: UserCheck,
        link: "/contact?type=consultation",
        action: "Book Appointment"
    },
    {
        title: "Read Blogs",
        desc: "Stay informed with the latest legal insights and updates.",
        icon: BookOpen,
        link: "/insights",
        action: "Explore Articles"
    },
];

const HomeCitizen = () => {
    return (
        <section id="citizen-services" className="bg-background py-24 lg:py-32">
            <div className="container mx-auto px-6 lg:px-12">
                <ScrollReveal>
                    <div className="mb-16 text-center">
                        <span className="text-sans text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4 block">
                            For Everyone
                        </span>
                        <h2 className="text-serif text-4xl lg:text-5xl font-bold text-foreground">
                            Citizen Legal Services
                        </h2>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, i) => (
                        <ScrollReveal key={service.title} delay={i * 0.1}>
                            <Link
                                to={service.link}
                                className="group block h-full bg-surface-charcoal/5 hover:bg-surface-charcoal/10 rounded-2xl p-10 text-center transition-all duration-300"
                            >
                                <div className="w-16 h-16 mx-auto rounded-full bg-background shadow-sm flex items-center justify-center mb-6 text-foreground group-hover:scale-110 group-hover:bg-foreground group-hover:text-background transition-all duration-300">
                                    <service.icon size={24} />
                                </div>
                                <h3 className="text-serif text-2xl font-medium text-foreground mb-4">
                                    {service.title}
                                </h3>
                                <p className="text-sans text-body text-muted-foreground mb-8 max-w-xs mx-auto">
                                    {service.desc}
                                </p>
                                <div className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-border bg-background text-xs font-bold uppercase tracking-wider group-hover:bg-foreground group-hover:text-background group-hover:border-foreground transition-all duration-300">
                                    {service.action}
                                </div>
                            </Link>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomeCitizen;
