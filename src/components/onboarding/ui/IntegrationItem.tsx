
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

type IntegrationItemProps = {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  connected: boolean;
  onToggle: () => void;
};

export const IntegrationItem = ({
  id,
  name,
  description,
  iconUrl,
  connected,
  onToggle
}: IntegrationItemProps) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleToggle = async () => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      onToggle();
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center">
        <div className="w-12 h-12 rounded mr-4 flex items-center justify-center overflow-hidden">
          <img src={iconUrl} alt={`${name} logo`} className="w-full h-full object-contain" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-medium">{name}</h3>
            {connected && (
              <Badge variant="green" className="py-[3px] px-[12px]">
                Connected
              </Badge>
            )}
          </div>
          <p className="text-gray-500 text-sm">{description}</p>
        </div>
      </div>
      
      <Button 
        variant="default" 
        size="sm" 
        onClick={handleToggle} 
        className="h-9 min-w-[100px]"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {connected ? "Disconnecting" : "Connecting"}
          </>
        ) : (
          connected ? "Disconnect" : "Connect"
        )}
      </Button>
    </div>
  );
};
