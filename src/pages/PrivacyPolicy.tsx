import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const PrivacyPolicy = () => {
  return (
    <main className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <SEO title="Privacy Policy | The Finance View Finance" description="Privacy Policy for our Finance Investment Website" />
      <Navbar />
      <div className="flex-grow max-w-4xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-sm text-slate-500 mb-8">Last Updated: July 2026</p>

        <div className="space-y-6 text-slate-700 dark:text-slate-300">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">1. Information Collection</h2>
            <p>We collect information you provide directly to us, such as when you create an account, fill out a form, or request support. This includes your name, email address, phone number, and country code.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">2. Data Usage</h2>
            <p>Your data is used to provide, maintain, and improve our services, as well as to communicate with you regarding your account and investment opportunities.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">3. CRM Processing</h2>
            <p>When you sign up or submit a contact form, your details are securely transmitted to our Customer Relationship Management (CRM) system for processing and lead management. We ensure that this transfer is conducted securely.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">4. Cookies & Tracking</h2>
            <p>We use cookies and similar tracking technologies to track activity on our service and hold certain information to improve and analyze our service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">5. Security</h2>
            <p>The security of your data is important to us, but remember that no method of transmission over the Internet is 100% secure. We strive to use commercially acceptable means to protect your Personal Data, including secure blob storage.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">6. Data Retention</h2>
            <p>We will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">7. User Rights</h2>
            <p>You have the right to access, update, or delete the information we have on you. Please contact us to exercise these rights.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">8. Marketing & Third Parties</h2>
            <p>We do not sell your personal information to third parties. We may use your information to contact you with newsletters or marketing materials that may be of interest to you.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">9. International Transfers</h2>
            <p>Your information may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">10. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us via our website's contact form.</p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default PrivacyPolicy;
