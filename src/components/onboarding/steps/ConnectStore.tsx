
import { useState } from "react";
import { ServiceCard } from "../ui/ServiceCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type ConnectStoreProps = {
  onNext: () => void;
  onBack: () => void;
};

type Platform = {
  id: string;
  name: string;
  selected: boolean;
  icon?: React.ReactNode;
  logoUrl?: string;
};

export const ConnectStore = ({
  onNext,
  onBack
}: ConnectStoreProps) => {
  const [platforms, setPlatforms] = useState<Platform[]>([
    {
      id: "shopify",
      name: "Shopify",
      selected: true,
      logoUrl: "/lovable-uploads/shopify-logo.png"
    }, 
    {
      id: "prestashop",
      name: "Prestashop",
      selected: false,
      logoUrl: "/lovable-uploads/prestashop-logo.png"
    }, 
    {
      id: "woocommerce",
      name: "Woocommerce",
      selected: false,
      logoUrl: "/lovable-uploads/woocommerce-logo.png"
    }, 
    {
      id: "magento",
      name: "Magento",
      selected: false,
      logoUrl: "/lovable-uploads/magento-logo.png"
    }, 
    {
      id: "bigcommerce",
      name: "Bigcommerce",
      selected: false,
      logoUrl: "/lovable-uploads/bigcommerce-logo.png"
    }, 
    {
      id: "wix",
      name: "Wix",
      selected: false,
      logoUrl: "/lovable-uploads/wix-logo.png"
    }
  ]);
  
  const [storeUrl, setStoreUrl] = useState("");
  
  const togglePlatform = (id: string) => {
    setPlatforms(platforms.map(platform => {
      // Make selection exclusive - only one at a time
      if (id === platform.id) {
        return {
          ...platform,
          selected: true
        };
      } else {
        return {
          ...platform,
          selected: false
        };
      }
    }));
  };
  
  const handleConnect = () => {
    // Handle connection logic
    onNext(); // Proceed to next step
  };
  
  return <div className="flex-1">
      <h1 className="mb-4 text-4xl font-normal">Connect your store</h1>
      <p className="text-gray-600 mt-4 text-base mb-[64px]">Easily link your online store to streamline operations, manage products, and sync data across platforms for a seamless selling experience.</p>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {platforms.map(platform => (
          <ServiceCard 
            key={platform.id} 
            title={platform.name} 
            selected={platform.selected} 
            onClick={() => togglePlatform(platform.id)}
            logoUrl={platform.logoUrl}
          />
        ))}
      </div>

      <div className="flex items-center bg-blue-50 p-4 rounded-lg max-w-lg">
        <div className="bg-gray-200 text-gray-700 px-3 py-2 rounded-l border border-gray-300">
          https://
        </div>
        <Input 
          value={storeUrl} 
          onChange={e => setStoreUrl(e.target.value)} 
          placeholder="websitename" 
          className="rounded-l-none border-l-0" 
        />
        <Button 
          onClick={handleConnect} 
          className="ml-4"
          style={{
            borderRadius: "8px",
            border: "1px solid #116FAE",
            backgroundColor: "#116FAE",
            boxShadow: "0px 2px 4px 0px rgba(13, 87, 136, 0.16)"
          }}
        >
          Connect
        </Button>
      </div>
    </div>;
};
