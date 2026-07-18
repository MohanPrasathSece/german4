import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-8 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 flex flex-col items-center gap-5 sm:gap-4 sm:flex-row sm:justify-between">
        <div className="text-serif font-bold text-lg tracking-wide">
          NOVA ASSETS
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-background/70">
          <Link to="/" className="hover:text-background transition-colors">Startseite</Link>
          <Link to="/privacy-policy" className="hover:text-background transition-colors">Datenschutz</Link>
          <Link to="/terms-and-conditions" className="hover:text-background transition-colors">AGB</Link>
        </div>

        <div className="text-xs text-background/50 text-center sm:text-right">
          © {currentYear} Nova Assets. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
