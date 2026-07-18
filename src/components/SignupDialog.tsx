import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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

      const res = await fetch("/api/crm/signup", {
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
            description: "Welcome to Vertex IQ",
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
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-4">Create Account</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input placeholder="Full Name" {...register("name")} />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <Input placeholder="Email Address" type="email" {...register("email")} />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <CountrySelect value={selectedCountry} onChange={(val) => setValue("country", val)} />
            </div>
            <div className="col-span-2">
              <Input placeholder={`Phone (${selectedCountryData?.example || ''})`} {...register("phone")} />
            </div>
          </div>
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}

          <Button type="submit" className="w-full bg-foreground hover:opacity-90 text-background mt-4" disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : "Sign Up"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
