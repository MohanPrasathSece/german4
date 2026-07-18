import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import PracticeAreas from "@/components/PracticeAreas";
import Stats from "@/components/Stats";
import Ticker from "@/components/Ticker";
import BrandStory from "@/components/BrandStory";
import ContactCTA from "@/components/ContactCTA";

// New sections
import HomeTools from "@/components/HomeTools";
import HomeCitizen from "@/components/HomeCitizen";
import HomeJobs from "@/components/HomeJobs";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main>
      <SEO
        title="Litigation Reformed | Modern Legal Authority"
        description="Vakalt is a leading legal authority redefining litigation through strategic excellence, specialized expertise, and innovative legal technologies."
      />
      <Navbar />

      <Hero
        onScrollToTools={() => scrollToSection('explore-legal-tools')}
        onScrollToCitizen={() => scrollToSection('citizen-services')}
      />

      <div id="explore-legal-tools">
        <HomeTools />
      </div>

      <div id="citizen-services">
        <HomeCitizen />
      </div>

      <HomeJobs />

      <Stats />

      <Ticker />

      <PracticeAreas />

      <BrandStory />

      <ContactCTA />

      <Footer />
    </main>
  );
};

export default Index;
