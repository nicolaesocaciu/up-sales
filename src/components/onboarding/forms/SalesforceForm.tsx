
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

export const SalesforceForm = () => {
  const { toast } = useToast();
  const [salesforceDomain, setSalesforceDomain] = useState("");
  const [salesforceOption, setSalesforceOption] = useState("products");
  const [isConnecting, setIsConnecting] = useState(false);
  
  const isFormValid = () => {
    return salesforceDomain.trim() !== "";
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
      <h3 className="text-lg font-medium mb-4">Connect to Salesforce</h3>
      <div className="space-y-4">
        <div>
          <Label htmlFor="salesforce-domain">Salesforce Domain</Label>
          <Input 
            id="salesforce-domain" 
            placeholder="your-domain.my.salesforce.com" 
            className="mt-1" 
            value={salesforceDomain}
            onChange={(e) => setSalesforceDomain(e.target.value)}
          />
        </div>
        <div>
          <Label>Import Options</Label>
          <RadioGroup 
            value={salesforceOption} 
            onValueChange={setSalesforceOption}
            className="mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="products" id="products" />
              <Label htmlFor="products">Products only</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="products-pricing" id="products-pricing" />
              <Label htmlFor="products-pricing">Products with pricing</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="full" id="full" />
              <Label htmlFor="full">Full product data</Label>
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
