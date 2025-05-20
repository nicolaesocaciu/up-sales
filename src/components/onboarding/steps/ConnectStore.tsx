
import { useState } from "react";
import { ServiceCard } from "../ui/ServiceCard";
import { PlatformDetails } from "./PlatformDetails";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

type ConnectStoreProps = {
  onNext: () => void;
  onBack: () => void;
};

type Platform = {
  id: string;
  name: string;
  selected: boolean;
  logoUrl?: string;
  connected: boolean;
};

export const ConnectStore = ({
  onNext,
  onBack
}: ConnectStoreProps) => {
  const [platforms, setPlatforms] = useState<Platform[]>([{
    id: "shopify",
    name: "Shopify",
    selected: false,
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg",
    connected: false
  }, {
    id: "prestashop",
    name: "Prestashop",
    selected: false,
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Prestashop.svg/1280px-Prestashop.svg.png",
    connected: false
  }, {
    id: "woocommerce",
    name: "Woocommerce",
    selected: false,
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2a/WooCommerce_logo.svg",
    connected: false
  }, {
    id: "magento",
    name: "Magento",
    selected: false,
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/55/Magento_Logo.svg",
    connected: false
  }, {
    id: "bigcommerce",
    name: "Bigcommerce",
    selected: false,
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Bc-logo-dark.svg",
    connected: false
  }, {
    id: "wix",
    name: "Wix",
    selected: false,
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/7/76/Wix.com_website_logo.svg",
    connected: false
  }]);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const selectPlatform = (platform: Platform) => {
    setSelectedPlatform(platform);
    setShowDetails(true);
  };

  const handleBackToList = () => {
    setShowDetails(false);
  };

  const handleConnect = (platformId: string) => {
    // Update the connected status of the platform
    setPlatforms(platforms.map(platform => 
      platform.id === platformId ? {
        ...platform,
        connected: true
      } : platform
    ));
    
    // Update selectedPlatform to reflect connected status
    if (selectedPlatform && selectedPlatform.id === platformId) {
      setSelectedPlatform({
        ...selectedPlatform,
        connected: true
      });
    }
  };
  
  const handleDisconnect = (platformId: string) => {
    // Update the connected status of the platform
    setPlatforms(platforms.map(platform => 
      platform.id === platformId ? {
        ...platform,
        connected: false
      } : platform
    ));
    
    // Update selectedPlatform to reflect disconnected status
    if (selectedPlatform && selectedPlatform.id === platformId) {
      setSelectedPlatform({
        ...selectedPlatform,
        connected: false
      });
    }
  };
  
  // Check if any platform is connected
  const hasConnectedPlatform = platforms.some(platform => platform.connected);

  return <div className="flex-1 relative overflow-hidden">
      {/* Main Content */}
      <div className="relative z-0">
        <h1 className="mb-4 text-4xl font-normal">Connect your store</h1>
        <p className="text-gray-600 mt-4 text-base mb-[64px]">
          Easily link your online store to streamline operations, manage products, and sync data across platforms for a seamless selling experience.
        </p>

        <div className="grid grid-cols-3 gap-8">
          {platforms.map(platform => <ServiceCard 
            key={platform.id} 
            title={platform.name} 
            selected={platform.selected || platform.connected} 
            onClick={() => selectPlatform(platform)} 
            logoUrl={platform.logoUrl} 
            badge={platform.connected ? "Connected" : undefined} 
            badgeColor={platform.connected ? "green" : undefined} 
          />)}
        </div>

        {hasConnectedPlatform && (
          <div className="mt-8 flex justify-end">
            <Button 
              onClick={onNext}
              style={{
                borderRadius: "8px",
                border: "1px solid #116FAE",
                backgroundColor: "#116FAE",
                boxShadow: "0px 2px 4px 0px rgba(13, 87, 136, 0.16)"
              }}
            >
              Continue to next step
            </Button>
          </div>
        )}
      </div>

      {/* Details View Overlay */}
      <div className={`absolute top-0 left-0 w-full h-full transition-transform duration-300 ease-in-out bg-white z-10
          ${showDetails ? '' : 'transform translate-x-full'}`}>
        {selectedPlatform && <PlatformDetails 
          platform={selectedPlatform} 
          onBack={handleBackToList} 
          onConnect={() => handleConnect(selectedPlatform.id)}
          onDisconnect={() => handleDisconnect(selectedPlatform.id)}
        />}
      </div>
    </div>;
};
