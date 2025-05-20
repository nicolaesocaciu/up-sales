
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Loader2, Check } from "lucide-react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

export const SalesforceForm = () => {
  const [salesforceDomain, setSalesforceDomain] = useLocalStorageState("onboarding.forms.salesforce.domain", "");
  const [salesforceOption, setSalesforceOption] = useLocalStorageState("onboarding.forms.salesforce.option", "products");
  const [isConnecting, setIsConnecting] = useLocalStorageState("onboarding.forms.salesforce.connecting", false);
  const [importSuccess, setImportSuccess] = useLocalStorageState("onboarding.forms.salesforce.success", false);
  
  const isFormValid = () => {
    return salesforceDomain.trim() !== "";
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
        <h3 className="text-lg font-medium">Connect to Salesforce</h3>
      </div>
      <div className="space-y-4">
        <div>
          <Label htmlFor="salesforce-domain">Salesforce Domain</Label>
          <Input 
            id="salesforce-domain" 
            placeholder="your-domain.my.salesforce.com" 
            className="mt-1" 
            value={salesforceDomain} 
            onChange={e => setSalesforceDomain(e.target.value)} 
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
        {importSuccess ? <div className="flex items-center gap-4">
            <Button disabled>
              Successfully imported
            </Button>
            <Badge variant="green" className="flex items-center gap-2 px-[12px] py-[7px]">
              <Check size={16} className="text-[#2D7048]" />
              <span className="text-sm">3872 products have been successfully imported</span>
            </Badge>
          </div> : <Button 
              onClick={handleConnect} 
              disabled={!isFormValid() || isConnecting}
            >
            {isConnecting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isConnecting ? "Connecting..." : "Connect & Import"}
          </Button>}
      </div>
    </div>;
};
