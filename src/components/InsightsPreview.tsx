
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";
import { supabase } from "@/lib/supabase";

const fallbackArticles = [
  {
    title: "Understanding Civil Litigation Timelines in 2025",
    category: "Civil Litigation",
    created_at: "2025-01-28",
    read_time: "6 min",
    slug: "civil-litigation-timelines"
  },
  {
    title: "Corporate Governance: Key Compliance Updates",
    category: "Corporate Law",
    created_at: "2025-01-15",
    read_time: "8 min",
    slug: "corporate-governance-updates"
  },
  {
    title: "Navigating Property Disputes: A Modern Guide",
    category: "Real Estate",
    created_at: "2025-01-05",
    read_time: "5 min",
    slug: "property-disputes-guide"
  },
  {
    title: "Intellectual Property Protection in the Digital Age",
    category: "IP Law",
    created_at: "2024-12-20",
    read_time: "7 min",
    slug: "ip-protection-digital"
  },
];

const InsightsPreview = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    const fetchLatest = async () => {
      const { data } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(4);

      if (data && data.length > 0) {
        setArticles(data);
      } else {
        setArticles(fallbackArticles);
      }
    };

    fetchLatest();
  }, []);

  return (
    <section className="bg-background py-28 lg:py-40">
      <div className="container mx-auto px-6 lg:px-12">
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 lg:mb-24">
            <div>
              <p className="text-sans text-label uppercase text-muted-foreground mb-4">Legal Intelligence</p>
              <h2 className="text-serif text-display-sm font-bold text-foreground">
                Latest Insights
              </h2>
            </div>
            <Link
              to="/insights"
              className="text-sans text-[10px] font-bold uppercase tracking-[0.11em] border border-foreground px-6 py-2.5 rounded-full text-foreground hover:bg-foreground hover:text-background transition-all duration-500 self-start lg:self-auto"
            >
              View All Articles
            </Link>
          </div>
        </ScrollReveal>

        <div>
          {articles.map((article, i) => (
            <ScrollReveal key={article.id || article.title} delay={i * 0.05}>
              <Link
                to={`/insights/${article.slug}`}
                className="group block border-t border-border last:border-b"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="flex items-center justify-between py-8 lg:py-10">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3 lg:mb-4">
                      <span className="text-sans text-label uppercase text-muted-foreground/60">
                        {article.category}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                      <span className="text-sans text-label text-muted-foreground/40">
                        {new Date(article.created_at).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/30 hidden sm:block" />
                      <span className="text-sans text-label text-muted-foreground/40 hidden sm:block">
                        {article.read_time}
                      </span>
                    </div>
                    <h3 className="text-serif text-heading font-semibold text-foreground group-hover:translate-x-3 transition-transform duration-500">
                      {article.title}
                    </h3>
                  </div>
                  <motion.div
                    initial={false}
                    animate={{
                      scale: hoveredIndex === i ? 1 : 0.5,
                      opacity: hoveredIndex === i ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="ml-6"
                  >
                    <ArrowUpRight className="w-6 h-6 text-foreground" />
                  </motion.div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsightsPreview;
