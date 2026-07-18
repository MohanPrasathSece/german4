import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-8 border-t border-border">
      <div className="container mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-serif font-bold text-lg tracking-wide">
          NOVA ASSETS
        </div>
        
        <div className="flex items-center gap-6 text-sm text-background/70">
          <Link to="/" className="hover:text-background transition-colors">Home</Link>
          <Link to="/crypto" className="hover:text-background transition-colors">Dashboard</Link>
          <Link to="/privacy-policy" className="hover:text-background transition-colors">Privacy Policy</Link>
          <Link to="/terms-and-conditions" className="hover:text-background transition-colors">Terms</Link>
        </div>

        <div className="text-xs text-background/50">
          © {currentYear} Nova Assets. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
