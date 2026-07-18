import { useEffect, useState } from "react";
import DashboardNavbar from "@/components/DashboardNavbar";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ContactForm from "@/components/ContactForm";
import { AlertCircle, ShieldCheck, Lock } from "lucide-react";

const CryptoDashboard = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const isAuth = localStorage.getItem("nova_auth");
    if (!isAuth) {
      window.location.href = "/";
    } else {
      setMounted(true);
    }
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SEO
        title="Dashboard | Nova Assets"
        description="Your Secure Investment Dashboard."
      />
      <DashboardNavbar />

      {/* Hero / Urgency Section */}
      <section className="pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-20 lg:pb-24 px-4 sm:px-6 lg:px-12 relative flex items-center min-h-[60vh] border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto w-full text-center relative z-10">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/10 border border-red-500/20 text-red-500 font-bold text-xs sm:text-sm tracking-wide mb-5 animate-pulse">
              <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              LIMITED ALLOCATION REMAINING
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold mb-5 lg:mb-6 text-foreground leading-tight tracking-tight">
              Welcome to the <span className="opacity-70 font-serif italic">Inner Circle</span>
            </h1>
            <p className="text-base sm:text-xl text-muted-foreground mb-7 lg:mb-8 max-w-2xl mx-auto leading-relaxed">
              You are currently viewing a restricted gateway. Access to our proprietary liquidity pools is strictly capped to maintain algorithmic efficiency. Secure your position before enrollment permanently closes.
            </p>
            <div className="flex justify-center">
              <button className="w-full sm:w-auto bg-foreground text-background px-7 py-3.5 sm:px-8 sm:py-4 rounded-full font-bold text-sm tracking-widest uppercase hover:opacity-90 transition-opacity shadow-xl">
                Activate Your Portfolio
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Security Cards */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 bg-muted/30 relative border-b border-border">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10 lg:mb-16">
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-background border border-border shadow-sm mb-5 sm:mb-6">
                 <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 text-foreground" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-foreground tracking-tight">Uncompromising Security. Relentless Growth.</h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                We don't rely on luck. We utilize highly sophisticated institutional-grade infrastructure to safely multiply your assets. Every transaction is encrypted, verified, and secured by leading cryptographic standards.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {[
              {
                icon: <Lock className="w-5 h-5 sm:w-6 sm:h-6 mb-4 text-foreground/70" />,
                title: "Absolute Asset Protection",
                desc: "Your capital is isolated within heavily encrypted cold-storage architecture. We operate on a strict zero-trust model, ensuring that your funds remain untouchable by external threats."
              },
              {
                icon: <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 mb-4 text-foreground/70" />,
                title: "Risk-Averse Arbitrage",
                desc: "Instead of gambling on volatile market directions, our systems exploit micro-inefficiencies across global exchanges. We only execute trades when the mathematical probability of success is absolute."
              },
              {
                icon: <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 mb-4 text-foreground/70" />,
                title: "Exclusive Compounding",
                desc: "Profits are not left idle. Through automated precision, your gains are instantly reinvested back into the liquidity pools, creating a compounding cycle that accelerates your wealth continuously."
              },
            ].map((feature, i) => (
              <ScrollReveal key={i} delay={0.1 * i}>
                <div className="p-7 sm:p-10 rounded-[32px] bg-background border border-border h-full transition-all hover:shadow-xl hover:-translate-y-1 relative overflow-hidden group">
                  {feature.icon}
                  <h3 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-4 relative z-10">{feature.title}</h3>
                  <p className="text-muted-foreground relative z-10 leading-relaxed text-sm sm:text-base">{feature.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section id="contact" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 bg-background relative">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground tracking-tight">Time is of the Essence</h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Due to overwhelming institutional demand, retail allocation slots are rapidly depleting. Contact your dedicated advisor immediately to finalize your onboarding.
              </p>
            </div>
            <div className="bg-background p-6 sm:p-8 lg:p-12 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-border relative overflow-hidden">
              <ContactForm />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CryptoDashboard;
