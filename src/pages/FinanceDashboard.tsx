import { useEffect, useState } from "react";
import DashboardNavbar from "@/components/DashboardNavbar";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ContactForm from "@/components/ContactForm";
import { AlertCircle, ShieldCheck, Lock } from "lucide-react";

const FinanceDashboard = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const isAuth = localStorage.getItem("thefinanceview_auth");
    if (!isAuth) {
      window.location.href = "/";
    } else {
      setMounted(true);
    }
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SEO
        title="Dashboard | The Finance View"
        description="Ihr sicheres Investment-Dashboard."
      />
      <DashboardNavbar />

      {/* Hero / Urgency Section */}
      <section className="pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-20 lg:pb-24 px-4 sm:px-6 lg:px-12 relative flex items-center min-h-[60vh] border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto w-full text-center relative z-10">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/10 border border-red-500/20 text-red-500 font-bold text-xs sm:text-sm tracking-wide mb-5 animate-pulse">
              <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              LETZTE VERFÜGBARE ZUTEILUNGEN
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold mb-5 lg:mb-6 text-foreground leading-tight tracking-tight">
              Willkommen im <span className="opacity-70 font-serif italic">Inner Circle</span>
            </h1>
            <p className="text-base sm:text-xl text-muted-foreground mb-7 lg:mb-8 max-w-2xl mx-auto leading-relaxed">
              Sie betrachten derzeit ein eingeschränktes Gateway. Der Zugang zu unseren proprietären Liquiditätspools ist streng limitiert, um die algorithmische Effizienz aufrechtzuerhalten. Sichern Sie sich Ihre Position, bevor die Registrierung endgültig geschlossen wird.
            </p>
            <div className="flex justify-center">
              <button className="w-full sm:w-auto bg-foreground text-background px-7 py-3.5 sm:px-8 sm:py-4 rounded-full font-bold text-sm tracking-widest uppercase hover:opacity-90 transition-opacity shadow-xl">
                Portfolio aktivieren
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Security Cards */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 bg-muted/30 relative border-b border-border">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10 lg:mb-16">
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-background border border-border shadow-sm mb-5 sm:mb-6">
                 <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 text-foreground" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-foreground tracking-tight">Kompromisslose Sicherheit. Unerbittliches Wachstum.</h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Wir verlassen uns nicht auf Glück. Wir nutzen hochkomplexe, institutionelle Infrastruktur, um Ihr Vermögen sicher zu vermehren. Jede Transaktion wird verschlüsselt, verifiziert und durch führende kryptografische Standards gesichert.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {[
              {
                icon: <Lock className="w-5 h-5 sm:w-6 sm:h-6 mb-4 text-foreground/70" />,
                title: "Absoluter Vermögensschutz",
                desc: "Ihr Kapital ist innerhalb einer stark verschlüsselten Cold-Storage-Architektur isoliert. Wir arbeiten nach einem strikten Zero-Trust-Modell und stellen sicher, dass Ihre Gelder für externe Bedrohungen unantastbar bleiben."
              },
              {
                icon: <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 mb-4 text-foreground/70" />,
                title: "Risikoarme Arbitrage",
                desc: "Anstatt auf volatile Marktrichtungen zu spekulieren, nutzen unsere Systeme Mikro-Ineffizienzen über globale Börsen hinweg. Wir führen Trades nur aus, wenn die mathematische Erfolgsquote absolut ist."
              },
              {
                icon: <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 mb-4 text-foreground/70" />,
                title: "Exklusiver Zinseszins",
                desc: "Gewinne bleiben nicht ungenutzt. Durch automatisierte Präzision werden Ihre Erträge sofort wieder in die Liquiditätspools reinvestiert, wodurch ein Zinseszinseffekt entsteht, der Ihr Vermögen kontinuierlich beschleunigt."
              },
            ].map((feature, i) => (
              <ScrollReveal key={i} delay={0.1 * i}>
                <div className="p-7 sm:p-10 rounded-[32px] bg-background border border-border h-full transition-all hover:shadow-xl hover:-translate-y-1 relative overflow-hidden group">
                  {feature.icon}
                  <h3 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-4 relative z-10">{feature.title}</h3>
                  <p className="text-muted-foreground relative z-10 leading-relaxed text-sm sm:text-base">{feature.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section id="contact" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 bg-background relative">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground tracking-tight">Zeit ist von entscheidender Bedeutung</h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Aufgrund der überwältigenden institutionellen Nachfrage sind die Zuteilungsplätze für Privatkunden schnell erschöpft. Wenden Sie sich umgehend an Ihren persönlichen Berater, um Ihr Onboarding abzuschließen.
              </p>
            </div>
            <div className="bg-background p-6 sm:p-8 lg:p-12 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-border relative overflow-hidden">
              <ContactForm />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default FinanceDashboard;
