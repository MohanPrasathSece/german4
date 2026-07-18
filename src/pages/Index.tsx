import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ContactForm from "@/components/ContactForm";
import Ticker from "@/components/Ticker";
import TradingCandles from "@/components/TradingCandles";

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      <SEO
        title="Nova Assets | Crypto Investments"
        description="Invest in the Future of Crypto with Nova Assets."
      />
      <Navbar />

      {/* Section 1: Hero */}
      <section className="pt-40 pb-24 px-6 lg:px-12 relative flex items-center min-h-[80vh]">
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <div className="inline-block px-4 py-1.5 rounded-full bg-red-600/20 border border-red-500/30 text-red-500 font-bold text-sm tracking-wide mb-6 animate-pulse">
              URGENT: 2,341 of 2,500 Exclusive Memberships Claimed
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-foreground leading-tight">
              Invest in the <span className="opacity-70 font-serif italic">Future of Crypto</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-lg">
              Unlock the power of digital assets with Nova Assets. We provide secure, data-driven crypto investment strategies for the modern investor. Spots are strictly limited to maintain high yield percentages.
            </p>
            <div className="flex gap-4">
              <a href="#contact" className="px-8 py-4 bg-foreground text-background hover:opacity-90 rounded-full font-semibold transition-all">
                Claim Your Spot Now
              </a>
              <a href="#about" className="px-8 py-4 bg-background border border-border hover:bg-muted rounded-full font-semibold transition-all">
                Learn More
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            {/* Real-time Trading Chart Visualizer */}
            <div className="relative w-full max-w-lg mx-auto flex items-center justify-center pt-8 lg:pt-0">
               <div className="absolute inset-0 bg-red-600/5 rounded-3xl blur-3xl animate-pulse" />
               <TradingCandles />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Ticker text="CRYPTO • HIGH YIELD • LIMITED SPOTS • INSTITUTIONAL GRADE • SECURE • DECENTRALIZED • NOVA ASSETS • " />

      {/* Section 2: About Us */}
      <section id="about" className="py-24 px-6 lg:px-12 bg-muted/30 relative border-y border-border">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 text-foreground">Strictly Limited Access</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Nova Assets is a premier cryptocurrency investment firm. We cap our membership at 2,500 clients to ensure our algorithmic trading models remain highly effective without diluting returns in the market.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Exclusive Analysis", desc: "Our team of analysts monitors blockchain activity and market sentiment 24/7 for a closed group of investors." },
              { title: "Maximum Yield", desc: "By limiting capital pools, we deploy proven algorithmic strategies to maximize yields and manage risk effectively." },
              { title: "Priority Processing", desc: "Skip the queue. Members get direct access to dedicated account managers and priority fund processing." },
            ].map((feature, i) => (
              <ScrollReveal key={i} delay={0.1 * i}>
                <div className="p-8 rounded-3xl bg-background border border-border h-full transition-transform hover:-translate-y-2">
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Why Choose Us */}
      <section className="py-24 px-6 lg:px-12 bg-background relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-foreground text-background border border-border shadow-2xl flex items-center justify-center p-8">
               <div className="text-center">
                 <div className="w-20 h-20 bg-background/20 text-background rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                 </div>
                 <h3 className="text-2xl font-bold mb-2">100% Asset Protection</h3>
                 <p className="opacity-70">Multi-signature cold storage</p>
               </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
             <div className="inline-block px-3 py-1 rounded bg-red-600/20 text-red-500 font-bold text-xs uppercase tracking-wider mb-4">
              Final Allocations Remaining
            </div>
            <h2 className="text-4xl font-bold mb-6 text-foreground">Security & Unmatched Returns</h2>
            <p className="text-lg text-muted-foreground mb-8">
              We don't just guess where the market is going; we rely on billions of data points processed by advanced AI models. Our closed-loop system means your returns aren't shared with the masses.
            </p>
            <ul className="space-y-4">
              {[
                "Offline Cold Storage for 95% of assets",
                "Real-time AI Sentiment Analysis",
                "Private Portfolio Rebalancing",
                "Strict Regulatory Compliance"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-foreground">
                  <div className="w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center text-xs">
                    ✓
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 4: Contact Us */}
      <section id="contact" className="py-24 px-6 lg:px-12 bg-muted/50 border-t border-border">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-foreground">Secure Your Allocation</h2>
              <p className="text-lg text-muted-foreground">
                <span className="font-bold text-foreground">Only 159 spots left.</span> Submit your details below immediately to ensure our crypto advisors can process your onboarding.
              </p>
            </div>
            <div className="bg-background p-8 lg:p-12 rounded-3xl shadow-xl border border-border relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 bg-red-600 text-white font-bold transform translate-x-8 translate-y-4 rotate-45 text-xs shadow-lg">
                 HIGH DEMAND
              </div>
              <ContactForm />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Index;
