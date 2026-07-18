import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ContactForm from "@/components/ContactForm";

const CryptoDashboard = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 overflow-hidden">
      <SEO
        title="Dashboard | Vertex IQ"
        description="Your Crypto Investment Dashboard"
      />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-12 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-slate-900 dark:text-white">
              Elevate Your <span className="text-blue-600 dark:text-blue-400">Crypto Portfolio</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl">
              We leverage AI Market Analysis and advanced trading strategies to safely and securely grow your investments.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 1: How We Improve Customers Investment Amount */}
      <section className="py-24 px-6 lg:px-12 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md relative border-y border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <h2 className="text-4xl font-bold mb-8">Maximizing Your Returns</h2>
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700">
                <h3 className="text-xl font-semibold mb-2">AI-Driven Insights</h3>
                <p className="text-slate-600 dark:text-slate-400">Our advanced algorithms analyze market trends 24/7 to identify high-yield opportunities before they become mainstream.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700">
                <h3 className="text-xl font-semibold mb-2">Portfolio Diversification</h3>
                <p className="text-slate-600 dark:text-slate-400">We spread your investments across established coins and promising altcoins to balance risk and reward effectively.</p>
              </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            {/* Animated Chart Mockup */}
            <div className="relative aspect-square md:aspect-video lg:aspect-square bg-slate-100 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl flex items-end p-8">
              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent" />
              <div className="w-full h-3/4 flex items-end justify-between gap-2 relative z-10">
                {[40, 55, 45, 70, 60, 85, 100].map((height, i) => (
                  <div 
                    key={i} 
                    className="w-full bg-blue-500 rounded-t-sm transition-all duration-1000 ease-out hover:bg-blue-400"
                    style={{ height: `${height}%`, animationDelay: `${i * 100}ms` }}
                  />
                ))}
              </div>
              
              {/* Floating Element */}
              <div className="absolute top-8 right-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/20">
                <p className="text-sm font-semibold text-green-500">+124.5% YTD</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 2: How Safe & Secure */}
      <section className="py-24 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <ScrollReveal className="order-2 lg:order-1">
            {/* Security Illustration */}
            <div className="relative w-full aspect-square bg-slate-900 rounded-3xl border border-slate-800 p-8 shadow-2xl flex flex-col justify-center items-center overflow-hidden">
               {/* Lock Icon Mockup */}
               <div className="w-32 h-32 mb-8 relative">
                 <div className="absolute inset-x-4 top-0 h-16 border-8 border-slate-700 rounded-t-full" />
                 <div className="absolute inset-x-0 bottom-0 h-20 bg-blue-600 rounded-xl flex items-center justify-center">
                    <div className="w-4 h-8 bg-slate-900 rounded-full" />
                 </div>
               </div>
               <h3 className="text-2xl font-bold text-white mb-2">Military-Grade Security</h3>
               <p className="text-slate-400 text-center">Cold storage, multi-sig wallets, and constant auditing.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="order-1 lg:order-2">
            <h2 className="text-4xl font-bold mb-8">Uncompromising Security</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Cold Storage</h3>
                  <p className="text-slate-600 dark:text-slate-400">95% of digital assets are stored safely in offline, geographically distributed cold storage.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Risk Management</h3>
                  <p className="text-slate-600 dark:text-slate-400">Automated stop-losses and strict position sizing rules protect your portfolio from extreme volatility.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 3: Contact Form */}
      <section className="py-24 px-6 lg:px-12 bg-slate-100 dark:bg-slate-950">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Ready to start?</h2>
              <p className="text-slate-600 dark:text-slate-400">Get in touch with our advisors today.</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800">
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
