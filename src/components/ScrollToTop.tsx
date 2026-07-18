import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    if (!isVisible) {
        return null;
    }

    return (
        <Button
            className="fixed bottom-8 right-8 z-50 rounded-full w-14 h-14 shadow-2xl hover:shadow-xl transition-all duration-300 bg-foreground text-background"
            onClick={scrollToTop}
            size="icon"
            aria-label="Scroll to top"
        >
            <ArrowUp className="h-8 w-8" />
        </Button>
    );
};
