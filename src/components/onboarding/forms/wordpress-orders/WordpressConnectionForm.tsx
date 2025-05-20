
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

type WordpressConnectionFormProps = {
  wordpressUrl: string;
  setWordpressUrl: (url: string) => void;
  consumerKey: string;
  setConsumerKey: (key: string) => void;
  consumerSecret: string;
  setConsumerSecret: (secret: string) => void;
  isConnecting: boolean;
  isConnected: boolean;
  handleConnect: () => void;
};

export const WordpressConnectionForm = ({
  wordpressUrl,
  setWordpressUrl,
  consumerKey,
  setConsumerKey,
  consumerSecret, 
  setConsumerSecret,
  isConnecting,
  isConnected,
  handleConnect
}: WordpressConnectionFormProps) => {
  const isFormValid = () => {
    return wordpressUrl.trim() !== "" && consumerKey.trim() !== "" && consumerSecret.trim() !== "";
  };

  return (
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
        <p className="text-sm text-gray-500 mt-1">Enter your WordPress site URL</p>
      </div>
      
      <div>
        <Label htmlFor="consumer-key">WooCommerce Consumer Key</Label>
        <Input 
          id="consumer-key" 
          placeholder="ck_xxxxxxxxxxxxxxxxxxxxxxxx" 
          className="mt-1" 
          value={consumerKey} 
          onChange={e => setConsumerKey(e.target.value)} 
        />
      </div>
      
      <div>
        <Label htmlFor="consumer-secret">WooCommerce Consumer Secret</Label>
        <Input 
          id="consumer-secret" 
          type="password" 
          placeholder="cs_xxxxxxxxxxxxxxxxxxxxxxxx" 
          className="mt-1" 
          value={consumerSecret} 
          onChange={e => setConsumerSecret(e.target.value)} 
        />
        <p className="text-sm text-gray-500 mt-1">
          Find your keys in WooCommerce &gt; Settings &gt; Advanced &gt; REST API
        </p>
      </div>
      
      <Button 
        onClick={handleConnect}
        disabled={!isFormValid() || isConnecting}
        className="border border-[#116FAE] bg-[#116FAE] hover:bg-[#0D5788] hover:border-[#0D5788] rounded-[8px]"
      >
        {isConnecting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isConnecting ? "Connecting..." : isConnected ? "Connected" : "Connect to WordPress"}
      </Button>
    </div>
  );
};
