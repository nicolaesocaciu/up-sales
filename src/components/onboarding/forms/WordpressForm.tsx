
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Loader2, Check } from "lucide-react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

export const WordpressForm = () => {
  const [wordpressUrl, setWordpressUrl] = useLocalStorageState("onboarding.forms.wordpress.url", "");
  const [wordpressKey, setWordpressKey] = useLocalStorageState("onboarding.forms.wordpress.key", "");
  const [isConnecting, setIsConnecting] = useLocalStorageState("onboarding.forms.wordpress.connecting", false);
  const [importSuccess, setImportSuccess] = useLocalStorageState("onboarding.forms.wordpress.success", false);
  
  const isFormValid = () => {
    return wordpressUrl.trim() !== "" && wordpressKey.trim() !== "";
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
        <h3 className="text-lg font-medium">Connect to WordPress</h3>
      </div>
      <div className="space-y-4">
        <div>
          <Label htmlFor="wordpress-url">WordPress Site URL</Label>
          <Input 
            id="wordpress-url" 
            placeholder="https://your-site.com" 
            className="mt-1" 
            value={wordpressUrl} 
            onChange={e => setWordpressUrl(e.target.value)} 
          />
        </div>
        <div>
          <Label htmlFor="wordpress-key">API Key</Label>
          <Input 
            id="wordpress-key" 
            type="password" 
            placeholder="Enter your WooCommerce API key" 
            className="mt-1" 
            value={wordpressKey} 
            onChange={e => setWordpressKey(e.target.value)} 
          />
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
