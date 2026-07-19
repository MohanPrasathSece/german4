import { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { AuthDialog } from "./AuthDialog";

const navLinks = [
  { label: "Sicherheit", href: "/#security" },
  { label: "Strategie", href: "/#about" },
  { label: "Kontakt", href: "/#contact" },
];

const Navbar = ({ isLight = false }: { isLight?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const searchBtnRef = useRef<HTMLButtonElement>(null);

  const handleLinkClick = (href: string) => {
    const targetPath = href.split("#")[0] || "/";
    const isHashLink = href.includes("#");

    if (location.pathname === targetPath) {
      if (isHashLink) {
        const id = href.split("#")[1];
        const element = document.getElementById(id);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      window.scrollTo(0, 0);
    }
    setIsOpen(false);
  };

  const textColorClass = "text-foreground";
  const borderColorClass = "border-foreground";
  const hoverBgClass = 'hover:bg-foreground hover:text-background';
  const hamburgerColorClass = "bg-foreground";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-background border-b border-border py-4`}
      >
        <nav className="container mx-auto flex items-center justify-between px-6 lg:px-12 relative">
          <Link
            to="/"
            onClick={() => handleLinkClick('/')}
            className={`text-serif text-2xl lg:text-3xl font-bold tracking-[0.08em] transition-colors duration-300 ${textColorClass}`}
          >
            THE FINANCE VIEW
          </Link>

          <div className="flex items-center gap-6">
            <ul className="hidden lg:flex items-center gap-12">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    onClick={() => handleLinkClick(link.href)}
                    className={`text-sans text-sm tracking-[0.05em] uppercase transition-all duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:h-px after:transition-all after:duration-300 text-muted-foreground hover:text-foreground after:bg-foreground ${location.pathname === link.href
                        ? "text-foreground after:w-full"
                        : "after:w-0 hover:after:w-full"
                      }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <button
              ref={searchBtnRef}
              onClick={() => setShowSearch(!showSearch)}
              className={`hidden lg:flex items-center justify-center p-2 rounded-full hover:bg-muted transition-colors ${textColorClass}`}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <AuthDialog defaultView="login">
              <button className={`hidden lg:inline-block text-sans text-[10px] font-bold tracking-[0.1em] uppercase transition-all duration-500 ${textColorClass} hover:opacity-70 mr-4`}>
                Anmelden
              </button>
            </AuthDialog>

            <AuthDialog defaultView="signup">
              <button className={`hidden lg:inline-block text-sans text-[10px] font-bold tracking-[0.1em] uppercase border px-6 py-2.5 rounded-full transition-all duration-500 ${borderColorClass} ${textColorClass} ${hoverBgClass}`}>
                Registrieren
              </button>
            </AuthDialog>

            <div className="lg:hidden flex items-center gap-4">
              <button
                onClick={() => setShowSearch(true)}
                className={`p-2 rounded-full transition-colors ${textColorClass}`}
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                className="flex flex-col gap-[5px] p-2 z-50 relative"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                <motion.span
                  animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  className={`block w-7 h-[1.5px] origin-center transition-colors duration-300 ${hamburgerColorClass}`}
                />
                <motion.span
                  animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  className={`block w-7 h-[1.5px] transition-colors duration-300 ${hamburgerColorClass}`}
                />
                <motion.span
                  animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  className={`block w-7 h-[1.5px] origin-center transition-colors duration-300 ${hamburgerColorClass}`}
                />
              </button>
            </div>
          </div>

          <AnimatePresence>
            {showSearch && (
              <>
                <div
                  className="fixed inset-0 z-[55] bg-black/20 backdrop-blur-[2px]"
                  onClick={() => setShowSearch(false)}
                />

                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="fixed lg:absolute top-20 left-4 right-4 lg:left-auto lg:right-[150px] lg:top-[70px] z-[60] bg-background border border-border shadow-2xl rounded-lg overflow-hidden max-w-lg mx-auto lg:w-[400px]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-3 border-b border-border flex items-center gap-3">
                    <Search className="w-5 h-5 text-muted-foreground" />
                    <Input
                      autoFocus
                      placeholder="Werte suchen..."
                      className="border-none shadow-none text-lg focus-visible:ring-0 p-0 h-auto"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button onClick={() => setShowSearch(false)} className="text-muted-foreground hover:text-foreground lg:hidden">
                      X
                    </button>
                  </div>
                  {searchQuery && (
                    <div className="p-2 bg-muted/30 max-h-[300px] overflow-y-auto">
                      <div className="space-y-1">
                        {(() => {
                          const searchItems = [
                            { label: "Startseite", href: "/", desc: "Zurück zur Startseite" },
                            { label: "Dashboard", href: "/finance", desc: "Ihr Finanz-Portfolio ansehen" },
                            { label: "Kontakt", href: "/#contact", desc: "Kontaktieren Sie unsere Experten" },
                          ];

                          const filteredItems = searchItems.filter(i =>
                            i.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            i.desc.toLowerCase().includes(searchQuery.toLowerCase())
                          );

                          return filteredItems.length > 0 ? (
                            filteredItems.map((item) => (
                              <Link
                                key={item.label}
                                to={item.href}
                                onClick={() => { setShowSearch(false); handleLinkClick(item.href); }}
                                className="block px-3 py-3 rounded-md hover:bg-background transition-colors group"
                              >
                                <p className="text-sm font-medium text-foreground group-hover:text-primary">{item.label}</p>
                                <p className="text-xs text-muted-foreground">{item.desc}</p>
                              </Link>
                            ))
                          ) : (
                            <p className="text-sm text-muted-foreground p-3 text-center">Keine übereinstimmenden Ergebnisse.</p>
                          );
                        })()}
                      </div>
                    </div>
                  )}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </nav>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at top right)" }}
            animate={{ clipPath: "circle(150% at top right)" }}
            exit={{
              clipPath: "circle(0% at top right)",
              transition: { duration: 0.3 }
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden fixed inset-0 bg-background z-[100] flex flex-col justify-center items-center"
          >
            <div className="flex flex-col items-center gap-8 relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute -top-32 right-0 p-4 text-foreground/50 hover:text-foreground transition-colors"
              >
                <span className="sr-only">Menü schließen</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-8 h-8"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 50, rotate: 5 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5, type: "spring" }}
                >
                  <Link
                    to={link.href}
                    onClick={() => handleLinkClick(link.href)}
                    className="text-serif text-display-sm text-foreground hover:opacity-60 transition-opacity duration-300"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
