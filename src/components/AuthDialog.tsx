import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Loader2, AlertCircle, Shield, TrendingUp, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CountrySelect, COUNTRIES, formatPhoneWithPrefix } from "./CountrySelect";

const signupSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(5, "Phone number is required"),
  country: z.string().min(2, "Country is required"),
});

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

type SignupFormValues = z.infer<typeof signupSchema>;
type LoginFormValues = z.infer<typeof loginSchema>;

const features = [
  { icon: <Shield className="w-5 h-5" />, text: "Bank-grade encryption" },
  { icon: <TrendingUp className="w-5 h-5" />, text: "AI-powered trading bots" },
  { icon: <Lock className="w-5 h-5" />, text: "Cold storage protection" },
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
      if (!countryData) throw new Error("Invalid country");
      const formattedPhone = formatPhoneWithPrefix(data.phone, countryData.dialCode);

      if (!countryData.regex.test(formattedPhone)) {
        setServerError(`Phone format for ${countryData.name}: ${countryData.example}`);
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
        throw new Error("Network error - please try again");
      });

      if (res.status === 400) {
        setServerError("We couldn't process your details. Please check and try again.");
      } else if (res.ok || res.status === 409) {
        toast({
          title: res.status === 409 ? "Welcome Back" : "Account Created",
          description: "You now have access to the Nova Assets platform.",
        });
        setIsOpen(false);
        localStorage.setItem("nova_auth", "true");
        navigate("/crypto");
      } else {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Something went wrong");
      }
    } catch (err: any) {
      setServerError(err.message || "An unexpected error occurred.");
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
        throw new Error("Network error - please try again");
      });

      if (res.ok) {
        toast({
          title: "Login Successful",
          description: "Welcome back to Nova Assets.",
        });
        setIsOpen(false);
        localStorage.setItem("nova_auth", "true");
        navigate("/crypto");
      } else {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Account not found. Please sign up first.");
      }
    } catch (err: any) {
      setServerError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="p-0 max-w-[900px] overflow-hidden rounded-[28px] border-0 shadow-[0_25px_80px_rgba(0,0,0,0.4)] bg-transparent">
        <div className="flex h-full min-h-[580px]">

          {/* Left Panel - Branding */}
          <div className="hidden lg:flex flex-col justify-between w-[42%] bg-[#0a0a0a] p-10 relative overflow-hidden">
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
              <div className="text-white font-bold text-2xl tracking-widest">NOVA ASSETS</div>
              <div className="mt-2 h-[1px] w-12 bg-red-500" />
            </div>

            {/* Middle content */}
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold tracking-wider mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                LIMITED SPOTS REMAINING
              </div>
              <h2 className="text-white text-3xl font-bold leading-tight mb-4">
                {view === "signup" ? "Join the Inner Circle" : "Welcome Back"}
              </h2>
              <p className="text-white/50 text-sm leading-relaxed">
                {view === "signup"
                  ? "Our proprietary algorithms are strictly limited to a closed group of investors to maintain performance."
                  : "Your capital is working around the clock. Access your secure portfolio dashboard."}
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
              By continuing, you agree to our terms of service and privacy policy.
            </div>
          </div>

          {/* Right Panel - Form */}
          <div className="flex-1 bg-white flex flex-col justify-center px-10 py-12">
            {/* Mobile logo */}
            <div className="lg:hidden mb-8">
              <div className="font-bold text-xl tracking-widest text-gray-900">NOVA ASSETS</div>
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
                Sign Up
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
                Log In
              </button>
            </div>

            {/* Title */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                {view === "signup" ? "Create your account" : "Welcome back"}
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                {view === "signup"
                  ? "Secure your allocation before spots run out."
                  : "Access your personal investment dashboard."}
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
                    placeholder="Full Name"
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
                    placeholder="Email Address"
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
                      placeholder={selectedCountryData?.example || "Phone number"}
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
                      Secure My Spot
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
                    placeholder="Email Address"
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
                      Access Dashboard
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Bottom switch */}
            <p className="text-center text-sm text-gray-400 mt-6">
              {view === "signup" ? (
                <>Already a member?{" "}
                  <button type="button" onClick={() => { setView("login"); setServerError(null); }} className="text-gray-900 font-semibold hover:underline">
                    Sign In
                  </button>
                </>
              ) : (
                <>Don't have an account?{" "}
                  <button type="button" onClick={() => { setView("signup"); setServerError(null); }} className="text-gray-900 font-semibold hover:underline">
                    Create One
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
