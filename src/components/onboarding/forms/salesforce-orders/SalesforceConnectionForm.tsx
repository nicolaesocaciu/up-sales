
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

type SalesforceConnectionFormProps = {
  salesforceDomain: string;
  setSalesforceDomain: (url: string) => void;
  clientId: string;
  setClientId: (key: string) => void;
  clientSecret: string;
  setClientSecret: (secret: string) => void;
  isConnecting: boolean;
  isConnected: boolean;
  handleConnect: () => void;
};

export const SalesforceConnectionForm = ({
  salesforceDomain,
  setSalesforceDomain,
  clientId,
  setClientId,
  clientSecret, 
  setClientSecret,
  isConnecting,
  isConnected,
  handleConnect
}: SalesforceConnectionFormProps) => {
  const isFormValid = () => {
    return salesforceDomain.trim() !== "" && clientId.trim() !== "" && clientSecret.trim() !== "";
  };

  return (
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
        <Label htmlFor="client-id">Client ID</Label>
        <Input 
          id="client-id" 
          placeholder="Enter your Salesforce client ID" 
          className="mt-1" 
          value={clientId} 
          onChange={e => setClientId(e.target.value)} 
        />
      </div>
      
      <div>
        <Label htmlFor="client-secret">Client Secret</Label>
        <Input 
          id="client-secret" 
          type="password" 
          placeholder="Enter your Salesforce client secret" 
          className="mt-1" 
          value={clientSecret} 
          onChange={e => setClientSecret(e.target.value)} 
        />
        <p className="text-sm text-gray-500 mt-1">
          You can find these in Salesforce Setup &gt; App Manager &gt; Connected Apps
        </p>
      </div>
      
      <Button 
        onClick={handleConnect}
        disabled={!isFormValid() || isConnecting}
        className="border border-[#116FAE] bg-[#116FAE] hover:bg-[#0D5788] hover:border-[#0D5788] rounded-[8px]"
      >
        {isConnecting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isConnecting ? "Connecting..." : isConnected ? "Connected" : "Connect to Salesforce"}
      </Button>
    </div>
  );
};
