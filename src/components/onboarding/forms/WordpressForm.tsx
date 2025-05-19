import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
export const WordpressForm = () => {
  const [wordpressUrl, setWordpressUrl] = useState("");
  const [wordpressKey, setWordpressKey] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);
  const isFormValid = () => {
    return wordpressUrl.trim() !== "" && wordpressKey.trim() !== "";
  };
  const handleConnect = () => {
    if (!isFormValid()) return;
    setIsConnecting(true);

    // Simulate API connection
    setTimeout(() => {
      setIsConnecting(false);
      setImportSuccess(true);
    }, 2000);
  };
  return <div className="mt-8 bg-[#F2F2F2] rounded-[16px] p-6 ">
      <h3 className="text-lg font-medium mb-4">Connect to WordPress</h3>
      <div className="space-y-4">
        <div>
          <Label htmlFor="wordpress-url">WordPress Site URL</Label>
          <Input id="wordpress-url" placeholder="https://your-site.com" className="mt-1" value={wordpressUrl} onChange={e => setWordpressUrl(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="wordpress-key">API Key</Label>
          <Input id="wordpress-key" type="password" placeholder="Enter your WooCommerce API key" className="mt-1" value={wordpressKey} onChange={e => setWordpressKey(e.target.value)} />
        </div>
        <Button onClick={handleConnect} disabled={!isFormValid() || isConnecting}>
          {isConnecting ? "Connecting..." : "Connect & Import"}
        </Button>
        
        {importSuccess && <div className="mt-4">
            <Badge variant="green" className="text-xs">
              3872 products have been successfully imported
            </Badge>
          </div>}
      </div>
    </div>;
};