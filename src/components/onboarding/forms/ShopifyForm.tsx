
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

export const ShopifyForm = () => {
  const { toast } = useToast();
  const [shopifyStore, setShopifyStore] = useState("");
  const [shopifyOption, setShopifyOption] = useState("all");
  const [isConnecting, setIsConnecting] = useState(false);
  
  const isFormValid = () => {
    return shopifyStore.trim() !== "";
  };

  const handleConnect = () => {
    if (!isFormValid()) return;
    
    setIsConnecting(true);
    
    // Simulate API connection
    setTimeout(() => {
      setIsConnecting(false);
      toast({
        title: "Connection successful",
        description: "3872 products have been successfully imported.",
      });
    }, 2000);
  };

  return (
    <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-medium mb-4">Connect to Shopify</h3>
      <div className="space-y-4">
        <div>
          <Label htmlFor="shopify-store">Shopify Store URL</Label>
          <Input 
            id="shopify-store" 
            placeholder="your-store.myshopify.com" 
            className="mt-1" 
            value={shopifyStore}
            onChange={(e) => setShopifyStore(e.target.value)}
          />
        </div>
        <div>
          <Label>What to import</Label>
          <RadioGroup 
            value={shopifyOption} 
            onValueChange={setShopifyOption}
            className="mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">All products</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="selected" id="selected" />
              <Label htmlFor="selected">Selected collections</Label>
            </div>
          </RadioGroup>
        </div>
        <Button 
          onClick={handleConnect}
          disabled={!isFormValid() || isConnecting}
        >
          {isConnecting ? "Connecting..." : "Connect & Import"}
        </Button>
      </div>
    </div>
  );
};
