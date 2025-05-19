
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Content from "./pages/Content";
import Marketing from "./pages/Marketing";
import Discounts from "./pages/Discounts";
import Settings from "./pages/Settings";
import HelpCenter from "./pages/Help";
import NotFound from "./pages/NotFound";
import Onboarding from "./pages/Onboarding";
import { useEffect } from "react";
import { migrateCustomersData } from "./utils/migrateCustomersData";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Run migration on app start
    migrateCustomersData().then(() => {
      console.log("Customer data migration check completed");
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/products" element={<Products />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/content" element={<Content />} />
            <Route path="/marketing" element={<Marketing />} />
            <Route path="/discounts" element={<Discounts />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
