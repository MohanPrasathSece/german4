import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { CountrySelect, COUNTRIES, formatPhoneWithPrefix } from "./CountrySelect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(5, "Phone number is required"),
  country: z.string().min(2, "Country is required"),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "CH",
      message: "",
    },
  });

  const selectedCountry = watch("country");
  const selectedCountryData = COUNTRIES.find(c => c.iso === selectedCountry);

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);

    try {
      const countryData = COUNTRIES.find(c => c.iso === data.country);
      if (!countryData) throw new Error("Invalid country");

      const formattedPhone = formatPhoneWithPrefix(data.phone, countryData.dialCode);

      // Client-side phone validation if we want, but server also checks.
      if (!countryData.regex.test(formattedPhone)) {
         toast({
          variant: "destructive",
          title: "Invalid Phone Number",
          description: `Example format for ${countryData.name}: ${countryData.example}`,
         });
         setIsLoading(false);
         return;
      }

      const payload = {
        name: data.name,
        email: data.email,
        phone: formattedPhone,
        country: countryData.name,
        message: data.message || "",
      };

      const res = await fetch("/api/crm/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.status === 400) {
        toast({
          variant: "destructive",
          title: "Invalid Details",
          description: "We couldn't process your enquiry with the information provided. Please review your details and try again.",
        });
      } else if (res.status === 409) {
        toast({
          title: "Request Received",
          description: "It looks like you've already contacted us. We've recognized your details and will continue with your request.",
        });
      } else if (res.ok) {
        toast({
          title: "Success",
          description: "Your message has been sent successfully. Our advisors will contact you shortly.",
        });
      } else {
        throw new Error("Unexpected failure");
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Unexpected Error",
        description: "An unexpected error occurred. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Input 
            placeholder="Full Name" 
            {...register("name")} 
            className="bg-white/5 dark:bg-slate-900/50"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <Input 
            placeholder="Email Address" 
            type="email"
            {...register("email")} 
            className="bg-white/5 dark:bg-slate-900/50"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <CountrySelect 
              value={selectedCountry}
              onChange={(val) => setValue("country", val)}
            />
          </div>
          <div className="col-span-2">
            <Input 
              placeholder={`Phone (e.g. ${selectedCountryData?.example || ''})`} 
              {...register("phone")} 
              className="bg-white/5 dark:bg-slate-900/50"
            />
          </div>
        </div>
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}

        <div>
          <Textarea 
            placeholder="Message (Optional)" 
            {...register("message")}
            className="min-h-[120px] bg-white/5 dark:bg-slate-900/50"
          />
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-blue-600 hover:bg-blue-700 text-white" 
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
};

export default ContactForm;
