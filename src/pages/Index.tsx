import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ContactForm from "@/components/ContactForm";
import Ticker from "@/components/Ticker";
import TradingCandles from "@/components/TradingCandles";
import { AuthDialog } from "@/components/AuthDialog";

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SEO
        title="Nova Assets | Crypto Investments"
        description="Invest in the Future of Crypto with Nova Assets."
      />
      <Navbar />

      {/* Section 1: Hero */}
      <section className="pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-20 lg:pb-24 px-4 sm:px-6 lg:px-12 relative flex items-center min-h-[85vh]">
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <ScrollReveal>
            <div className="inline-block px-3 py-1.5 rounded-full bg-red-600/20 border border-red-500/30 text-red-500 font-bold text-xs sm:text-sm tracking-wide mb-5 animate-pulse">
              URGENT: 2,341 of 2,500 Exclusive Memberships Claimed
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-5 lg:mb-6 text-foreground leading-[1.1]">
              Invest in the <span className="opacity-70 font-serif italic">Future of Crypto</span>
            </h1>
            <p className="text-base sm:text-xl text-muted-foreground mb-7 lg:mb-8 max-w-lg leading-relaxed">
              Unlock the power of digital assets with Nova Assets. We provide secure, data-driven crypto investment strategies for the modern investor. Spots are strictly limited.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <AuthDialog defaultView="signup">
                <button className="w-full sm:w-auto px-7 py-3.5 sm:px-8 sm:py-4 bg-foreground text-background hover:opacity-90 rounded-full font-semibold transition-all shadow-xl text-sm sm:text-base">
                  Claim Your Spot Now
                </button>
              </AuthDialog>
              <a href="#about" className="w-full sm:w-auto text-center px-7 py-3.5 sm:px-8 sm:py-4 bg-background border border-border hover:bg-muted rounded-full font-semibold transition-all text-sm sm:text-base">
                Learn More
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            {/* Real-time Trading Chart Visualizer */}
            <div className="relative w-full max-w-md sm:max-w-lg mx-auto flex items-center justify-center pt-6 lg:pt-0">
               <div className="absolute inset-0 bg-red-600/5 rounded-3xl blur-3xl animate-pulse" />
               <TradingCandles />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Ticker text="CRYPTO • HIGH YIELD • LIMITED SPOTS • INSTITUTIONAL GRADE • SECURE • DECENTRALIZED • NOVA ASSETS • " />

      {/* Section 2: About Us */}
      <section id="about" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 bg-muted/30 relative border-y border-border">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10 lg:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-foreground">Strictly Limited Access</h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Nova Assets is a premier cryptocurrency investment firm. We cap our membership at 2,500 clients to ensure our algorithmic trading models remain highly effective without diluting returns.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-8">
            {[
              { title: "Exclusive Analysis", desc: "Our team of analysts monitors blockchain activity and market sentiment 24/7 for a closed group of investors." },
              { title: "Maximum Yield", desc: "By limiting capital pools, we deploy proven algorithmic strategies to maximize yields and manage risk effectively." },
              { title: "Priority Processing", desc: "Skip the queue. Members get direct access to dedicated account managers and priority fund processing." },
            ].map((feature, i) => (
              <ScrollReveal key={i} delay={0.1 * i}>
                <div className="p-6 sm:p-8 rounded-[28px] bg-background border border-border h-full transition-transform hover:-translate-y-1">
                  <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{feature.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Why Choose Us */}
      <section id="security" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 bg-background relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <ScrollReveal>
            <div className="relative aspect-video rounded-[28px] overflow-hidden bg-foreground text-background border border-border shadow-2xl flex items-center justify-center p-6 sm:p-8">
               <div className="text-center">
                 <div className="w-16 h-16 sm:w-20 sm:h-20 bg-background/20 text-background rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                 </div>
                 <h3 className="text-xl sm:text-2xl font-bold mb-2">100% Asset Protection</h3>
                 <p className="opacity-70 text-sm sm:text-base">Multi-signature cold storage</p>
               </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
             <div className="inline-block px-3 py-1 rounded bg-red-600/20 text-red-500 font-bold text-xs uppercase tracking-wider mb-4">
              Final Allocations Remaining
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-foreground">Security &amp; Unmatched Returns</h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
              We don't just guess where the market is going; we rely on billions of data points processed by advanced AI models. Our closed-loop system means your returns aren't shared with the masses.
            </p>
            <ul className="space-y-3 sm:space-y-4">
              {[
                "Offline Cold Storage for 95% of assets",
                "Real-time AI Sentiment Analysis",
                "Private Portfolio Rebalancing",
                "Strict Regulatory Compliance"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-foreground text-sm sm:text-base">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-foreground text-background flex items-center justify-center text-xs shrink-0">
                    ✓
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 4: How It Works */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 bg-foreground text-background relative overflow-hidden border-t border-border">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-red-600/10 blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center mb-12 lg:mb-20">
              <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/60 font-bold text-xs tracking-widest mb-5 uppercase">
                The Process
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-background leading-tight tracking-tight">
                From Registration to <span className="opacity-60 font-serif italic">Active Returns</span>
              </h2>
              <p className="mt-4 text-background/50 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                We've eliminated all friction. Our onboarding is deliberately streamlined so your capital starts compounding immediately.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-8 relative">
            <div className="hidden md:block absolute top-14 left-[20%] right-[20%] h-[1px] bg-white/10" />

            {[
              { step: "01", title: "Secure Registration", desc: "Submit your details through our encrypted onboarding form. Your information is immediately isolated within a zero-trust security perimeter." },
              { step: "02", title: "Portfolio Allocation", desc: "Your dedicated advisor structures a bespoke capital allocation plan, selecting the highest-yielding liquidity pools available to your tier." },
              { step: "03", title: "Compound & Grow", desc: "Our algorithms activate immediately. Every cycle, your earnings are automatically reinvested, creating an accelerating compounding loop." },
            ].map((s, i) => (
              <ScrollReveal key={i} delay={0.15 * i}>
                <div className="relative p-7 sm:p-10 rounded-[28px] bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-all group">
                  <div className="text-6xl sm:text-7xl font-black text-white/5 group-hover:text-white/10 transition-colors absolute top-4 right-6 select-none">
                    {s.step}
                  </div>
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-5 sm:mb-6">
                    <span className="text-background font-bold text-sm">{s.step}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-background mb-2 sm:mb-3">{s.title}</h3>
                  <p className="text-background/50 leading-relaxed text-sm">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.4}>
            <div className="mt-12 lg:mt-16 text-center">
              <AuthDialog defaultView="signup">
                <button className="w-full sm:w-auto px-8 sm:px-10 py-4 bg-background text-foreground hover:bg-background/90 rounded-full font-bold text-sm tracking-wide transition-all shadow-2xl shadow-black/30">
                  Begin Your Onboarding
                </button>
              </AuthDialog>
              <p className="mt-4 text-background/30 text-xs">Limited positions available. Enrollment closes without notice.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 5: Contact Us */}
      <section id="contact" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 bg-muted/50 border-t border-border">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">Secure Your Allocation</h2>
              <p className="text-base sm:text-lg text-muted-foreground">
                <span className="font-bold text-foreground">Only 159 spots left.</span> Submit your details below immediately to ensure our crypto advisors can process your onboarding.
              </p>
            </div>
            <div className="bg-background p-6 sm:p-8 lg:p-12 rounded-[28px] shadow-xl border border-border relative overflow-hidden">
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
