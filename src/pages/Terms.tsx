import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Terms = () => {
  return (
    <main className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <SEO title="Terms & Conditions | VertexIQ Crypto" description="Terms and Conditions for our Crypto Investment Website" />
      <Navbar />
      <div className="flex-grow max-w-4xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>
        <p className="text-sm text-slate-500 mb-8">Last Updated: July 2026</p>

        <div className="space-y-6 text-slate-700 dark:text-slate-300">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">1. Acceptance</h2>
            <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">2. Eligibility</h2>
            <p>You must be at least 18 years old to use this website. By using this website, you warrant that you are of legal age to form a binding contract.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">3. Website Purpose</h2>
            <p>This website provides educational information about cryptocurrency, blockchain technology, and digital assets.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">4. User Responsibilities & Acceptable Use</h2>
            <p>You agree to use this site for lawful purposes only. You must not use the site in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">5. Intellectual Property</h2>
            <p>The website and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">6. Cryptocurrency Risk Disclosure</h2>
            <p>Cryptocurrency investments are highly volatile and carry a high level of risk. You could lose some or all of your initial investment. You should carefully consider your financial situation and risk tolerance before investing in cryptocurrencies.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">7. No Financial Advice & No Investment Advice</h2>
            <p>The information provided on this website does not constitute investment advice, financial advice, trading advice, or any other sort of advice. You should not treat any of the website's content as such.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">8. No Guaranteed Returns</h2>
            <p>Past performance is not indicative of future results. We do not guarantee any specific outcomes or returns on any cryptocurrency investments.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">9. Limitation of Liability</h2>
            <p>In no event shall we, nor our directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">10. Privacy Reference</h2>
            <p>Your use of the website is also governed by our Privacy Policy, which is incorporated into these terms by reference.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">11. Governing Law & Disputes</h2>
            <p>These Terms shall be governed and construed in accordance with the laws, without regard to its conflict of law provisions. Any dispute arising from these terms will be resolved in the applicable jurisdiction's courts.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">12. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us.</p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Terms;
