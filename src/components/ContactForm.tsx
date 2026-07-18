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
  name: z.string().min(2, "Name muss mindestens 2 Zeichen lang sein"),
  email: z.string().email("Ungültige E-Mail-Adresse"),
  phone: z.string().min(5, "Telefonnummer ist erforderlich"),
  country: z.string().min(2, "Land ist erforderlich"),
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
      if (!countryData) throw new Error("Ungültiges Land");

      const formattedPhone = formatPhoneWithPrefix(data.phone, countryData.dialCode);

      // Client-side phone validation if we want, but server also checks.
      if (!countryData.regex.test(formattedPhone)) {
         toast({
          variant: "destructive",
          title: "Ungültige Telefonnummer",
          description: `Beispielformat für ${countryData.name}: ${countryData.example}`,
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
          title: "Ungültige Details",
          description: "Wir konnten Ihre Anfrage mit den angegebenen Informationen nicht bearbeiten. Bitte überprüfen Sie Ihre Daten und versuchen Sie es erneut.",
        });
      } else if (res.status === 409) {
        toast({
          title: "Anfrage erhalten",
          description: "Es sieht so aus, als hätten Sie uns bereits kontaktiert. Wir haben Ihre Daten erkannt und werden Ihre Anfrage weiter bearbeiten.",
        });
      } else if (res.ok) {
        toast({
          title: "Erfolg",
          description: "Ihre Nachricht wurde erfolgreich gesendet. Unsere Berater werden sich in Kürze bei Ihnen melden.",
        });
      } else {
        throw new Error("Unerwarteter Fehler");
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Unerwarteter Fehler",
        description: "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später noch einmal.",
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
            placeholder="Vollständiger Name" 
            {...register("name")} 
            className="bg-white/5 dark:bg-slate-900/50"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <Input 
            placeholder="E-Mail-Adresse" 
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
              placeholder={`Telefon (z.B. ${selectedCountryData?.example || ''})`} 
              {...register("phone")} 
              className="bg-white/5 dark:bg-slate-900/50"
            />
          </div>
        </div>
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}

        <div>
          <Textarea 
            placeholder="Nachricht (Optional)" 
            {...register("message")}
            className="min-h-[120px] bg-white/5 dark:bg-slate-900/50"
          />
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-foreground hover:opacity-90 text-background"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Senden...
          </>
        ) : (
          "Nachricht senden"
        )}
      </Button>
    </form>
  );
};

export default ContactForm;
