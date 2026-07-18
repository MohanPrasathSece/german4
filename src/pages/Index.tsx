import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ContactForm from "@/components/ContactForm";

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 overflow-hidden">
      <SEO
        title="Vertex IQ | Crypto Investments"
        description="Invest in the Future of Crypto with Vertex IQ."
      />
      <Navbar />

      {/* Section 1: Hero */}
      <section className="pt-40 pb-24 px-6 lg:px-12 relative flex items-center min-h-[80vh]">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-slate-900 dark:text-white leading-tight">
              Invest in the <span className="text-blue-600 dark:text-blue-400">Future of Crypto</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-lg">
              Unlock the power of digital assets with Vertex IQ. We provide secure, data-driven crypto investment strategies for the modern investor.
            </p>
            <div className="flex gap-4">
              <a href="#contact" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-all">
                Get Started
              </a>
              <a href="#about" className="px-8 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-full font-semibold transition-all">
                Learn More
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="relative aspect-square w-full max-w-md mx-auto">
              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
              <div className="relative h-full w-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 rounded-3xl shadow-2xl p-8 flex flex-col justify-center items-center">
                <div className="text-blue-600 dark:text-blue-400 font-bold text-4xl mb-2">Bitcoin (BTC)</div>
                <div className="text-5xl font-bold mb-4">$64,230.00</div>
                <div className="text-green-500 font-semibold text-xl">+4.2% Today</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 2: About Us */}
      <section id="about" className="py-24 px-6 lg:px-12 bg-white dark:bg-slate-950 relative border-y border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">Who We Are & What We Do</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                Vertex IQ is a premier cryptocurrency investment firm. We bridge the gap between traditional finance and decentralized markets, offering our clients exposure to the most promising digital assets with institutional-grade security.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Expert Analysis", desc: "Our team of analysts monitors blockchain activity and market sentiment 24/7." },
              { title: "Strategic Growth", desc: "We deploy proven algorithmic strategies to maximize yields and manage risk." },
              { title: "Global Reach", desc: "Access the decentralized economy from anywhere in the world, securely." },
            ].map((feature, i) => (
              <ScrollReveal key={i} delay={0.1 * i}>
                <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 h-full">
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400">{feature.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Why Choose Us */}
      <section className="py-24 px-6 lg:px-12 bg-slate-50 dark:bg-slate-900 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl flex items-center justify-center p-8">
               <div className="text-center">
                 <div className="w-20 h-20 bg-blue-600/20 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                 </div>
                 <h3 className="text-2xl font-bold text-white mb-2">100% Asset Protection</h3>
                 <p className="text-slate-400">Multi-signature cold storage</p>
               </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <h2 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">Security & AI Insights</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              We don't just guess where the market is going; we rely on billions of data points processed by advanced AI models. Coupled with military-grade security infrastructure, your funds have never been safer.
            </p>
            <ul className="space-y-4">
              {[
                "Offline Cold Storage for 95% of assets",
                "Real-time AI Sentiment Analysis",
                "Automated Portfolio Rebalancing",
                "Strict Regulatory Compliance"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
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
      <section id="contact" className="py-24 px-6 lg:px-12 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Start Your Journey</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Ready to invest? Leave your details below and one of our crypto advisors will reach out to you.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 p-8 lg:p-12 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800">
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
