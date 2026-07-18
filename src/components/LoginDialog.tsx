import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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
      let res;
      try {
        res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
      } catch (networkError) {
        throw new Error("Network error or backend not running.");
      }

      if (res.ok) {
        toast({
          title: "Login Successful",
          description: "Welcome back to Nova Assets",
        });
        setIsOpen(false);
        navigate("/crypto");
      } else {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Account not found or invalid details.");
      }
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: err.message || "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[400px] p-0 border border-border bg-background shadow-2xl rounded-2xl overflow-hidden">
        <div className="p-8 lg:p-10">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h2>
            <p className="text-muted-foreground text-sm">Access your private dashboard.</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-1">
              <Input 
                type="email" 
                placeholder="Email Address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 px-4 rounded-lg border-border bg-muted/30 text-foreground placeholder:text-muted-foreground focus:bg-background focus:border-foreground transition-all text-center"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full h-12 rounded-lg font-bold bg-foreground text-background hover:opacity-90 transition-all text-base" 
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : "Sign In Securely"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
