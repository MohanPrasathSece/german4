import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export const LoginDialog = ({ children }: { children: React.ReactNode }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        toast({
          title: "Login Successful",
          description: "Welcome back to Nova Assets",
        });
        setIsOpen(false);
        navigate("/crypto");
      } else {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: "Account not found or invalid details.",
        });
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
      <DialogContent className="sm:max-w-[400px] bg-background border-border p-8 rounded-3xl shadow-2xl">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-3xl font-bold text-foreground">Welcome Back</DialogTitle>
          <DialogDescription className="text-muted-foreground mt-2 text-base">
            Log in to your Nova Assets account to access your portfolio.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-1">
            <Input 
              type="email" 
              placeholder="Email Address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 px-4 rounded-xl border-border bg-muted/50 focus:bg-background"
            />
          </div>
          <Button type="submit" className="w-full h-12 rounded-xl font-bold bg-foreground text-background hover:opacity-90 transition-all text-base" disabled={isLoading}>
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : "Sign In Securely"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
