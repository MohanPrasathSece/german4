import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CountrySelect, COUNTRIES, formatPhoneWithPrefix } from "./CountrySelect";

const signupSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(5, "Phone is required"),
  country: z.string().min(2, "Country is required"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type SignupFormValues = z.infer<typeof signupSchema>;
type LoginFormValues = z.infer<typeof loginSchema>;

export const AuthDialog = ({ children, defaultView = "signup" }: { children: React.ReactNode, defaultView?: "signup" | "login" }) => {
  const [view, setView] = useState<"signup" | "login">(defaultView);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Reset view when dialog opens
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
  const selectedCountryData = COUNTRIES.find(c => c.iso === selectedCountry);

  const handleSignup = async (data: SignupFormValues) => {
    setIsLoading(true);
    setServerError(null);
    try {
      const countryData = COUNTRIES.find(c => c.iso === data.country);
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
      }).catch(() => { throw new Error("Network error") });

      if (res.status === 400) {
        setServerError("We couldn't process your enquiry with the information provided.");
      } else if (res.ok || res.status === 409) {
        toast({ title: res.status === 409 ? "Account Found" : "Signup Successful", description: "Welcome to Nova Assets." });
        setIsOpen(false);
        localStorage.setItem("nova_auth", "true");
        navigate("/crypto");
      } else {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Unexpected failure");
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
      }).catch(() => { throw new Error("Network error") });

      if (res.ok) {
        toast({ title: "Login Successful", description: "Welcome back to Nova Assets" });
        setIsOpen(false);
        localStorage.setItem("nova_auth", "true");
        navigate("/crypto");
      } else {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Account not found.");
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
      <DialogContent className="sm:max-w-[460px] rounded-[32px] p-10 border border-border/40 shadow-[0_20px_50px_rgba(0,0,0,0.1)] bg-background/95 backdrop-blur-xl">
        <DialogHeader className="text-left mb-6">
          <DialogTitle className="text-3xl font-bold font-sans tracking-tight">
            {view === "signup" ? "Create Account" : "Welcome Back"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground/80 text-base mt-2">
            {view === "signup" 
              ? "Join Nova Assets to access premium crypto investments." 
              : "Enter your email to access your secure dashboard."}
          </DialogDescription>
        </DialogHeader>
        
        {serverError && (
          <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <p className="text-sm text-red-500/90 font-medium leading-relaxed">{serverError}</p>
          </div>
        )}

        {view === "signup" ? (
          <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-5 animate-in fade-in">
            <div className="space-y-2">
              <Input 
                placeholder="Full Name" 
                className="h-14 bg-muted/30 border-muted-foreground/20 focus-visible:ring-1 focus-visible:ring-foreground rounded-2xl px-5 text-base"
                {...signupForm.register("name")} 
              />
              {signupForm.formState.errors.name && <p className="text-red-500 text-xs px-2 font-medium">{signupForm.formState.errors.name.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Input 
                placeholder="Email Address" 
                type="email" 
                className="h-14 bg-muted/30 border-muted-foreground/20 focus-visible:ring-1 focus-visible:ring-foreground rounded-2xl px-5 text-base"
                {...signupForm.register("email")} 
              />
              {signupForm.formState.errors.email && <p className="text-red-500 text-xs px-2 font-medium">{signupForm.formState.errors.email.message}</p>}
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-1">
                <CountrySelect value={selectedCountry} onChange={(val) => signupForm.setValue("country", val)} />
              </div>
              <div className="col-span-2 space-y-2">
                <Input 
                  placeholder={`Phone (${selectedCountryData?.example || ''})`} 
                  className="h-14 bg-muted/30 border-muted-foreground/20 focus-visible:ring-1 focus-visible:ring-foreground rounded-2xl px-5 text-base"
                  {...signupForm.register("phone")} 
                />
                {signupForm.formState.errors.phone && <p className="text-red-500 text-xs px-2 font-medium">{signupForm.formState.errors.phone.message}</p>}
              </div>
            </div>

            <Button type="submit" className="w-full h-14 rounded-2xl text-base font-semibold mt-4 shadow-xl" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : "Sign Up"}
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-8">
              Already have an account?{" "}
              <button type="button" onClick={() => setView("login")} className="text-foreground font-semibold hover:underline">
                Log In
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-5 animate-in fade-in">
            <div className="space-y-2">
              <Input 
                type="email" 
                placeholder="Email Address" 
                className="h-14 bg-muted/30 border-muted-foreground/20 focus-visible:ring-1 focus-visible:ring-foreground rounded-2xl px-5 text-base"
                {...loginForm.register("email")}
              />
              {loginForm.formState.errors.email && <p className="text-red-500 text-xs px-2 font-medium">{loginForm.formState.errors.email.message}</p>}
            </div>
            <Button type="submit" className="w-full h-14 rounded-2xl text-base font-semibold mt-4 shadow-xl" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : "Sign In"}
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-8">
              Don't have an account?{" "}
              <button type="button" onClick={() => setView("signup")} className="text-foreground font-semibold hover:underline">
                Sign Up
              </button>
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
