
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

export const ShopifyForm = () => {
  const [shopifyStore, setShopifyStore] = useState("");
  const [shopifyOption, setShopifyOption] = useState("all");
  const [isConnecting, setIsConnecting] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);
  
  const isFormValid = () => {
    return shopifyStore.trim() !== "";
  };
  
  const handleConnect = () => {
    if (!isFormValid() || isConnecting || importSuccess) return;
    setIsConnecting(true);

    // Simulate API connection
    setTimeout(() => {
      setIsConnecting(false);
      setImportSuccess(true);
    }, 2000);
  };
  
  return <div className="mt-8 bg-[#F2F2F2] rounded-[16px] p-6 ">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Connect to Shopify</h3>
        {importSuccess && 
          <Badge variant="green" className="text-xs px-[12px] py-[3px]">
            3872 products have been successfully imported
          </Badge>
        }
      </div>
      <div className="space-y-4">
        <div>
          <Label htmlFor="shopify-store">Shopify Store URL</Label>
          <Input id="shopify-store" placeholder="your-store.myshopify.com" className="mt-1" value={shopifyStore} onChange={e => setShopifyStore(e.target.value)} />
        </div>
        <div>
          <Label>What to import</Label>
          <RadioGroup value={shopifyOption} onValueChange={setShopifyOption} className="mt-2">
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
          disabled={!isFormValid() || isConnecting || importSuccess}
        >
          {isConnecting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isConnecting ? "Connecting..." : importSuccess ? "Successfully imported" : "Connect & Import"}
        </Button>
      </div>
    </div>;
};
