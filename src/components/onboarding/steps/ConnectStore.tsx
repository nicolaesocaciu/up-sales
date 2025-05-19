
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
};

export const ConnectStore = ({ onNext, onBack }: ConnectStoreProps) => {
  const [platforms, setPlatforms] = useState<Platform[]>([
    { id: "shopify", name: "Shopify", selected: true },
    { id: "prestashop", name: "Prestashop", selected: false },
    { id: "woocommerce", name: "Woocommerce", selected: false },
    { id: "magento", name: "Magento", selected: false },
    { id: "bigcommerce", name: "Bigcommerce", selected: false },
    { id: "wix", name: "Wix", selected: false },
  ]);

  const [storeUrl, setStoreUrl] = useState("");

  const togglePlatform = (id: string) => {
    setPlatforms(platforms.map(platform => {
      // Make selection exclusive - only one at a time
      if (id === platform.id) {
        return { ...platform, selected: true };
      } else {
        return { ...platform, selected: false };
      }
    }));
  };

  const handleConnect = () => {
    // Handle connection logic
    onNext(); // Proceed to next step
  };

  return (
    <div className="flex-1">
      <h1 className="text-3xl font-bold mb-4">Connect your store</h1>
      <p className="text-gray-600 mb-8 max-w-lg">
        Interrogations will help you power up your CRM by connecting it with multiple 
        sources and it will become like comand center for your business. You can update 
        this option at any point in your settings.
      </p>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {platforms.map(platform => (
          <ServiceCard 
            key={platform.id}
            title={platform.name}
            selected={platform.selected}
            onClick={() => togglePlatform(platform.id)}
          />
        ))}
      </div>

      <div className="flex items-center bg-blue-50 p-4 rounded-lg max-w-lg">
        <div className="bg-gray-200 text-gray-700 px-3 py-2 rounded-l border border-gray-300">
          https://
        </div>
        <Input
          value={storeUrl}
          onChange={(e) => setStoreUrl(e.target.value)}
          placeholder="websitename"
          className="rounded-l-none border-l-0"
        />
        <Button 
          onClick={handleConnect}
          className="ml-4"
        >
          Connect
        </Button>
      </div>
    </div>
  );
};
