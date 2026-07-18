import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { ScrollToTop } from "./components/ScrollToTop";
import ScrollToTopHandler from "./components/ScrollToTopHandler";

// Lazy Load Pages for Performance
const Index = lazy(() => import("./pages/Index"));
const CryptoDashboard = lazy(() => import("./pages/CryptoDashboard"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Terms = lazy(() => import("./pages/Terms"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => (
  <HelmetProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/crypto" element={<CryptoDashboard />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <ScrollToTopHandler />
        <ScrollToTop />
      </BrowserRouter>
    </TooltipProvider>
  </HelmetProvider>
);

export default App;
