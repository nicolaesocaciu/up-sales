import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2 } from "lucide-react";
type ShopifyConnectionFormProps = {
  shopifyStore: string;
  setShopifyStore: (value: string) => void;
  apiToken: string;
  setApiToken: (value: string) => void;
  dataOption: string;
  setDataOption: (value: string) => void;
  isConnecting: boolean;
  handleConnect: () => void;
};
export const ShopifyConnectionForm = ({
  shopifyStore,
  setShopifyStore,
  apiToken,
  setApiToken,
  dataOption,
  setDataOption,
  isConnecting,
  handleConnect
}: ShopifyConnectionFormProps) => {
  const isFormValid = () => {
    return shopifyStore.trim() !== "" && apiToken.trim() !== "";
  };
  return <div className="space-y-4  py-6">
      <div>
        <Label htmlFor="shopify-store">Shopify Store URL</Label>
        <Input id="shopify-store" placeholder="your-store.myshopify.com" className="mt-1" value={shopifyStore} onChange={e => setShopifyStore(e.target.value)} />
      </div>
      
      <div>
        <Label htmlFor="api-token">API Token</Label>
        <Input id="api-token" type="password" placeholder="Enter your Shopify API token" className="mt-1" value={apiToken} onChange={e => setApiToken(e.target.value)} />
      </div>
      
      <div>
        <Label>What data to import</Label>
        <RadioGroup value={dataOption} onValueChange={setDataOption} className="mt-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="all" />
            <Label htmlFor="all">All users and orders</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="users" id="users" />
            <Label htmlFor="users">Users only</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="orders" id="orders" />
            <Label htmlFor="orders">Orders only</Label>
          </div>
        </RadioGroup>
      </div>
      
      <Button onClick={handleConnect} disabled={!isFormValid() || isConnecting} className="border border-[#116FAE] bg-[#116FAE] hover:bg-[#0D5788] hover:border-[#0D5788] rounded-[8px]">
        {isConnecting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isConnecting ? "Connecting..." : "Connect to Shopify"}
      </Button>
    </div>;
};