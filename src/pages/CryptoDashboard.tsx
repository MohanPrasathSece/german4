import { useEffect, useState } from "react";
import DashboardNavbar from "@/components/DashboardNavbar";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ContactForm from "@/components/ContactForm";

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
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      <SEO
        title="Dashboard | Nova Assets"
        description="Your Crypto Investment Dashboard."
      />
      <DashboardNavbar />

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6 lg:px-12 relative flex items-center min-h-[60vh] border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto w-full text-center">
          <ScrollReveal>
             <div className="inline-block px-4 py-1.5 rounded-full bg-green-600/20 border border-green-500/30 text-green-500 font-bold text-sm tracking-wide mb-6">
              ACCOUNT STATUS: VERIFIED INVESTOR
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-foreground leading-tight">
              Welcome to the <span className="opacity-70 font-serif italic">Inner Circle</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Your capital is now part of an exclusive liquidity pool. Here is exactly how we multiply your assets while you sleep.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* How We Improve Your Amount */}
      <section className="py-24 px-6 lg:px-12 bg-muted/30 relative">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 text-foreground">How We Grow Your Wealth</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Because we strictly cap our user base at 2,500 members, our trading algorithms can execute high-volume arbitrage without moving the market against us. Here is our 3-step growth engine.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                step: "01",
                title: "AI Arbitrage Scanning", 
                desc: "Our proprietary neural networks scan 40+ global exchanges 24/7, identifying micro-discrepancies in token prices before human traders can react." 
              },
              { 
                step: "02",
                title: "Liquidity Provisioning", 
                desc: "Your assets are safely deployed into high-yield decentralized liquidity pools, earning massive APYs from trading fees on tier-1 protocols." 
              },
              { 
                step: "03",
                title: "Auto-Compounding", 
                desc: "Profits aren't just sitting idle. Every hour, our smart contracts harvest your gains and reinvest them, triggering an aggressive compound interest loop." 
              },
            ].map((feature, i) => (
              <ScrollReveal key={i} delay={0.1 * i}>
                <div className="p-10 rounded-3xl bg-background border border-border h-full transition-transform hover:-translate-y-2 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 text-8xl font-black text-foreground/5 group-hover:text-foreground/10 transition-colors pointer-events-none">
                    {feature.step}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 relative z-10">{feature.title}</h3>
                  <p className="text-muted-foreground relative z-10">{feature.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Section */}
      <section className="py-24 px-6 lg:px-12 bg-background relative border-t border-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal delay={0.2}>
            <div className="inline-block px-3 py-1 rounded bg-foreground text-background font-bold text-xs uppercase tracking-wider mb-4">
              Real-Time Performance
            </div>
            <h2 className="text-4xl font-bold mb-6 text-foreground">Outperforming the Market</h2>
            <p className="text-lg text-muted-foreground mb-8">
              While retail investors panic over volatility, our algorithms thrive on it. By hedging against downside risk, we secure consistent, compounding returns regardless of whether Bitcoin goes up or down.
            </p>
            
            <div className="space-y-6">
              <div className="border-l-2 border-foreground pl-6 py-2">
                <p className="text-sm text-muted-foreground mb-1">Average Monthly Yield</p>
                <p className="text-3xl font-bold font-serif">+14.2%</p>
              </div>
              <div className="border-l-2 border-foreground pl-6 py-2">
                <p className="text-sm text-muted-foreground mb-1">Total Assets Under Management</p>
                <p className="text-3xl font-bold font-serif">$84,500,000</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-foreground text-background border border-border shadow-2xl flex flex-col items-center justify-center p-12 text-center">
               <div className="w-24 h-24 bg-background/20 text-background rounded-full flex items-center justify-center mb-8">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
               </div>
               <h3 className="text-3xl font-bold mb-4">Your Wealth is Compounding</h3>
               <p className="opacity-70 text-lg">Check your email for daily performance reports and trade breakdowns.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Support */}
      <section id="contact" className="py-24 px-6 lg:px-12 bg-muted/50 border-t border-border">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-foreground">Need Assistance?</h2>
              <p className="text-lg text-muted-foreground">
                Get in touch with your dedicated crypto advisor or submit a general inquiry below.
              </p>
            </div>
            <div className="bg-background p-8 lg:p-12 rounded-3xl shadow-xl border border-border relative overflow-hidden">
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
