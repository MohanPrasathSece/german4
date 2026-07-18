import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CountrySelect, COUNTRIES, formatPhoneWithPrefix } from "./CountrySelect";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(5, "Phone is required"),
  country: z.string().min(2, "Country is required"),
});

type FormValues = z.infer<typeof formSchema>;

export const SignupDialog = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { country: "CH" },
  });

  const selectedCountry = watch("country");
  const selectedCountryData = COUNTRIES.find(c => c.iso === selectedCountry);

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      const countryData = COUNTRIES.find(c => c.iso === data.country);
      if (!countryData) throw new Error("Invalid country");

      const formattedPhone = formatPhoneWithPrefix(data.phone, countryData.dialCode);

      if (!countryData.regex.test(formattedPhone)) {
         toast({
          variant: "destructive",
          title: "Invalid Phone Number",
          description: `Example format for ${countryData.name}: ${countryData.example}`,
         });
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
      });

      if (res.status === 400) {
        toast({
          variant: "destructive",
          title: "Invalid Details",
          description: "We couldn't process your enquiry with the information provided. Please review your details and try again.",
        });
      } else if (res.ok || res.status === 409) {
        if (res.status === 409) {
          toast({
            title: "Account Found",
            description: "It looks like you've already contacted us. We've recognized your details and logged you in.",
          });
        } else {
          toast({
            title: "Signup Successful",
            description: "Welcome to Nova Assets",
          });
        }
        setIsOpen(false);
        navigate("/crypto");
      } else {
        throw new Error("Unexpected failure");
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Unexpected Error",
        description: "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[450px] p-0 border-none bg-transparent overflow-hidden shadow-2xl">
        <div className="relative bg-black/90 backdrop-blur-xl border border-white/10 p-8 rounded-3xl overflow-hidden">
          {/* Abstract glowing background effects */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/20 rounded-full blur-[80px] pointer-events-none transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] pointer-events-none transform -translate-x-1/2 translate-y-1/2" />

          <div className="relative z-10">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Create Account</h2>
              <p className="text-white/60 text-sm">Join Nova Assets for exclusive crypto insights.</p>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1">
                <Input 
                  className="h-14 px-4 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/40 focus:bg-white/10 focus:border-white/30 transition-all shadow-inner" 
                  placeholder="Full Name" 
                  {...register("name")} 
                />
                {errors.name && <p className="text-red-400 text-xs px-2 mt-1">{errors.name.message}</p>}
              </div>
              
              <div className="space-y-1">
                <Input 
                  className="h-14 px-4 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/40 focus:bg-white/10 focus:border-white/30 transition-all shadow-inner" 
                  placeholder="Email Address" 
                  type="email" 
                  {...register("email")} 
                />
                {errors.email && <p className="text-red-400 text-xs px-2 mt-1">{errors.email.message}</p>}
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1">
                  <CountrySelect value={selectedCountry} onChange={(val) => setValue("country", val)} />
                </div>
                <div className="col-span-2 space-y-1">
                  <Input 
                    className="h-14 px-4 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/40 focus:bg-white/10 focus:border-white/30 transition-all shadow-inner" 
                    placeholder={`Phone (${selectedCountryData?.example || ''})`} 
                    {...register("phone")} 
                  />
                  {errors.phone && <p className="text-red-400 text-xs px-2 mt-1">{errors.phone.message}</p>}
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-14 mt-6 rounded-xl font-bold bg-white text-black hover:bg-gray-200 transition-all text-base shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]" 
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : "Sign Up Securely"}
              </Button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
