import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ContactForm from "@/components/ContactForm";

const CryptoDashboard = () => {
  const [session, setSession] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Note: Vercel Blob auth verification would happen via API in a real app,
    // but for now, we assume the user is authenticated since they reached here.
    setSession("Active");
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      <SEO
        title="Dashboard | Nova Assets"
        description="Your Crypto Investment Dashboard."
      />
      <Navbar />

      <section className="pt-40 pb-24 px-6 lg:px-12 relative flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-border pb-8">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-foreground">Welcome to Nova Assets</h1>
                <p className="text-xl text-muted-foreground">Your premium crypto portfolio overview.</p>
              </div>
              <div className="mt-6 md:mt-0 px-6 py-3 bg-foreground text-background rounded-full font-semibold">
                Status: Verified Investor
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ScrollReveal delay={0.1}>
              <div className="bg-muted/50 p-8 rounded-3xl border border-border shadow-lg h-full">
                <h2 className="text-2xl font-bold mb-6 text-foreground">AI-Driven Insights</h2>
                <div className="space-y-6">
                  <div className="border-l-2 border-foreground pl-4">
                    <h3 className="font-semibold text-lg text-foreground">Market Sentiment</h3>
                    <p className="text-muted-foreground mt-2">Our neural networks detect a bullish divergence in large-cap altcoins over the next 72 hours.</p>
                  </div>
                  <div className="border-l-2 border-foreground pl-4">
                    <h3 className="font-semibold text-lg text-foreground">Diversification Strategy</h3>
                    <p className="text-muted-foreground mt-2">Consider rotating 15% of stablecoin holdings into top 10 layer-1 protocols to capture incoming liquidity.</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="bg-foreground text-background p-8 rounded-3xl border border-border shadow-lg h-full">
                <h2 className="text-2xl font-bold mb-6">Cold Storage Status</h2>
                <div className="space-y-4">
                   <div className="flex justify-between items-center py-3 border-b border-background/20">
                     <span className="font-medium">Multi-Sig Vault A</span>
                     <span className="px-3 py-1 bg-background/20 rounded-full text-sm">Active</span>
                   </div>
                   <div className="flex justify-between items-center py-3 border-b border-background/20">
                     <span className="font-medium">Insurance Policy</span>
                     <span className="px-3 py-1 bg-background/20 rounded-full text-sm">Valid thru 2027</span>
                   </div>
                   <div className="flex justify-between items-center py-3">
                     <span className="font-medium">Last Audit</span>
                     <span className="px-3 py-1 bg-background/20 rounded-full text-sm">24 hours ago</span>
                   </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-12 bg-muted/30 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-foreground">Request Portfolio Review</h2>
              <p className="text-lg text-muted-foreground">
                Need personalized advice? Submit a request and your dedicated account manager will be in touch.
              </p>
            </div>
            <div className="bg-background p-8 rounded-3xl shadow-xl border border-border">
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
