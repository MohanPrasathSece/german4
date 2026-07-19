import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Loader2, AlertCircle, Shield, TrendingUp, Lock, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CountrySelect, COUNTRIES, formatPhoneWithPrefix } from "./CountrySelect";

const signupSchema = z.object({
  name: z.string().min(2, "Vollständiger Name ist erforderlich"),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
  phone: z.string().min(5, "Telefonnummer ist erforderlich"),
  country: z.string().min(2, "Land ist erforderlich"),
});

const loginSchema = z.object({
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
});

type SignupFormValues = z.infer<typeof signupSchema>;
type LoginFormValues = z.infer<typeof loginSchema>;

const features = [
  { icon: <Shield className="w-5 h-5" />, text: "Bankenübliche Verschlüsselung" },
  { icon: <TrendingUp className="w-5 h-5" />, text: "KI-gestützte Trading-Bots" },
  { icon: <Lock className="w-5 h-5" />, text: "Cold-Storage-Schutz" },
];

export const AuthDialog = ({
  children,
  defaultView = "signup",
}: {
  children: React.ReactNode;
  defaultView?: "signup" | "login";
}) => {
  const [view, setView] = useState<"signup" | "login">(defaultView);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setView(defaultView);
      setServerError(null);
    }
  }, [isOpen, defaultView]);

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { country: "CH" },
  });

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const selectedCountry = signupForm.watch("country");
  const selectedCountryData = COUNTRIES.find((c) => c.iso === selectedCountry);

  const handleSignup = async (data: SignupFormValues) => {
    setIsLoading(true);
    setServerError(null);
    try {
      const countryData = COUNTRIES.find((c) => c.iso === data.country);
      if (!countryData) throw new Error("Ungültiges Land");
      const formattedPhone = formatPhoneWithPrefix(data.phone, countryData.dialCode);

      if (!countryData.regex.test(formattedPhone)) {
        setServerError(`Telefonformat für ${countryData.name}: ${countryData.example}`);
        setIsLoading(false);
        return;
      }

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: formattedPhone,
          country: countryData.name,
        }),
      }).catch(() => {
        throw new Error("Netzwerkfehler - bitte versuchen Sie es erneut");
      });

      if (res.status === 400) {
        setServerError("Wir konnten Ihre Daten nicht verarbeiten. Bitte überprüfen Sie diese und versuchen Sie es erneut.");
      } else if (res.ok || res.status === 409) {
        toast({
          title: res.status === 409 ? "Willkommen zurück" : "Konto erstellt",
          description: "Sie haben nun Zugang zur The Finance View Plattform.",
        });
        setIsOpen(false);
        localStorage.setItem("thefinanceview_auth", "true");
        navigate("/finance");
      } else {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Etwas ist schief gelaufen");
      }
    } catch (err: any) {
      setServerError(err.message || "Ein unerwarteter Fehler ist aufgetreten.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (data: LoginFormValues) => {
    setIsLoading(true);
    setServerError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      }).catch(() => {
        throw new Error("Netzwerkfehler - bitte versuchen Sie es erneut");
      });

      if (res.ok) {
        toast({
          title: "Anmeldung erfolgreich",
          description: "Willkommen zurück bei The Finance View.",
        });
        setIsOpen(false);
        localStorage.setItem("thefinanceview_auth", "true");
        navigate("/finance");
      } else {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Konto nicht gefunden. Bitte registrieren Sie sich zuerst.");
      }
    } catch (err: any) {
      setServerError(err.message || "Ein unerwarteter Fehler ist aufgetreten.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="p-0 w-[95vw] sm:w-full max-w-[900px] overflow-hidden rounded-[24px] sm:rounded-[28px] border-0 shadow-[0_25px_80px_rgba(0,0,0,0.4)] bg-transparent">
        <div className="flex h-full min-h-[580px] rounded-[28px] overflow-hidden">

          {/* Left Panel - Branding */}
          <div className="hidden lg:flex flex-col justify-between w-[42%] bg-[#0a0a0a] p-10 relative overflow-hidden rounded-l-[28px]">
            {/* Subtle grid */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            {/* Red glow */}
            <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-red-600/20 blur-[80px] pointer-events-none" />
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-red-600/10 blur-[60px] pointer-events-none" />

            {/* Logo */}
            <div className="relative z-10">
              <div className="text-white font-bold text-2xl tracking-widest">THE FINANCE VIEW</div>
              <div className="mt-2 h-[1px] w-12 bg-red-500" />
            </div>

            {/* Middle content */}
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold tracking-wider mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                NUR NOCH WENIGE PLÄTZE VERFÜGBAR
              </div>
              <h2 className="text-white text-3xl font-bold leading-tight mb-4">
                {view === "signup" ? "Werden Sie Teil des Inner Circle" : "Willkommen zurück"}
              </h2>
              <p className="text-white/50 text-sm leading-relaxed">
                {view === "signup"
                  ? "Unsere proprietären Algorithmen sind streng auf eine geschlossene Investorengruppe limitiert, um die Leistung aufrechtzuerhalten."
                  : "Ihr Kapital arbeitet rund um die Uhr. Greifen Sie auf Ihr sicheres Portfolio-Dashboard zu."}
              </p>

              {/* Feature list */}
              <div className="mt-8 space-y-4">
                {features.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 text-white/70 text-sm">
                    <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-red-400">
                      {f.icon}
                    </div>
                    {f.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom notice */}
            <div className="relative z-10 text-white/30 text-xs leading-relaxed">
              Durch die Fortsetzung stimmen Sie unseren Nutzungsbedingungen und Datenschutzrichtlinien zu.
            </div>
          </div>

          {/* Right Panel - Form */}
          <div className="flex-1 bg-white flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-12 rounded-r-[28px]">
            {/* Mobile logo */}
            <div className="lg:hidden mb-8">
              <div className="font-bold text-xl tracking-widest text-gray-900">THE FINANCE VIEW</div>
              <div className="mt-1 h-[1px] w-10 bg-red-500" />
            </div>

            {/* View toggle tabs */}
            <div className="flex bg-gray-100 rounded-full p-1 mb-8 w-fit">
              <button
                type="button"
                onClick={() => { setView("signup"); setServerError(null); }}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  view === "signup"
                    ? "bg-gray-900 text-white shadow-md"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Registrieren
              </button>
              <button
                type="button"
                onClick={() => { setView("login"); setServerError(null); }}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  view === "login"
                    ? "bg-gray-900 text-white shadow-md"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Anmelden
              </button>
            </div>

            {/* Title */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                {view === "signup" ? "Konto erstellen" : "Willkommen zurück"}
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                {view === "signup"
                  ? "Sichern Sie sich Ihre Zuteilung, bevor die Plätze vergeben sind."
                  : "Greifen Sie auf Ihr persönliches Investment-Dashboard zu."}
              </p>
            </div>

            {/* Error message */}
            {serverError && (
              <div className="mb-5 p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <p className="text-sm text-red-600 font-medium leading-snug">{serverError}</p>
              </div>
            )}

            {/* Sign Up Form */}
            {view === "signup" ? (
              <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-4">
                {/* Name */}
                <div>
                  <input
                    placeholder="Vollständiger Name"
                    className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-all"
                    {...signupForm.register("name")}
                  />
                  {signupForm.formState.errors.name && (
                    <p className="text-red-500 text-xs mt-1.5 pl-1">{signupForm.formState.errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    placeholder="E-Mail-Adresse"
                    className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-all"
                    {...signupForm.register("email")}
                  />
                  {signupForm.formState.errors.email && (
                    <p className="text-red-500 text-xs mt-1.5 pl-1">{signupForm.formState.errors.email.message}</p>
                  )}
                </div>

                {/* Phone + Country */}
                <div className="flex gap-3">
                  <div className="w-32 shrink-0">
                    <CountrySelect
                      value={selectedCountry}
                      onChange={(val) => signupForm.setValue("country", val)}
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      placeholder={selectedCountryData?.example || "Telefonnummer"}
                      className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-all"
                      {...signupForm.register("phone")}
                    />
                    {signupForm.formState.errors.phone && (
                      <p className="text-red-500 text-xs mt-1.5 pl-1">{signupForm.formState.errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-gray-900/20 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Meinen Platz sichern
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                <div>
                  <input
                    type="email"
                    placeholder="E-Mail-Adresse"
                    className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-all"
                    {...loginForm.register("email")}
                  />
                  {loginForm.formState.errors.email && (
                    <p className="text-red-500 text-xs mt-1.5 pl-1">{loginForm.formState.errors.email.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-gray-900/20 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Zum Dashboard
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Bottom switch */}
            <p className="text-center text-sm text-gray-400 mt-6">
              {view === "signup" ? (
                <>Bereits Mitglied?{" "}
                  <button type="button" onClick={() => { setView("login"); setServerError(null); }} className="text-gray-900 font-semibold hover:underline">
                    Anmelden
                  </button>
                </>
              ) : (
                <>Noch kein Konto?{" "}
                  <button type="button" onClick={() => { setView("signup"); setServerError(null); }} className="text-gray-900 font-semibold hover:underline">
                    Eins erstellen
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
