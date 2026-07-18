import { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

const DashboardNavbar = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { toast } = useToast();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionToken: "dummy" })
      });
      localStorage.removeItem("nova_auth");
      window.location.href = "/";
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Logout failed",
        description: "Could not log out securely."
      });
      setIsLoggingOut(false);
    }
  };

  return (
    <nav className="fixed w-full z-50 transition-all duration-300 bg-background border-b border-border">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2 relative z-10">
            <span className="text-2xl font-serif font-bold tracking-wider">
              NOVA ASSETS
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            <span className="text-sm text-muted-foreground hidden sm:inline-block">
              Welcome back
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="rounded-full px-6"
            >
              {isLoggingOut ? "Logging out..." : (
                <>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
