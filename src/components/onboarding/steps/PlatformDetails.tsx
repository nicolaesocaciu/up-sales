
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Loader, LinkIcon, Link2Off } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

type Platform = {
  id: string;
  name: string;
  selected: boolean;
  icon?: React.ReactNode;
  connected?: boolean;
};

type PlatformDetailsProps = {
  platform: Platform;
  onBack: () => void;
  onConnect: () => void;
  onDisconnect: () => void;
};

export const PlatformDetails = ({
  platform,
  onBack,
  onConnect,
  onDisconnect
}: PlatformDetailsProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(platform.connected || false);
  
  const handleConnect = () => {
    setIsConnecting(true);

    // Simulate connection process
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      onConnect();
    }, 1500);
  };
  
  const handleDisconnect = () => {
    setIsDisconnecting(true);
    
    // Simulate disconnection process
    setTimeout(() => {
      setIsDisconnecting(false);
      setIsConnected(false);
      onDisconnect();
    }, 1500);
  };
  
  return <div className="h-full flex flex-col">
      <div className="flex flex-col border-b border-b-[#dadada]">
        <button onClick={onBack} className="self-start text-[#116fae] hover:underline flex items-center mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to all applications
        </button>
        
        <div className="flex items-center mb-6">
          <h2 className="text-2xl font-semibold">{platform.name}</h2>
          {isConnected && <Badge variant="green" className="ml-4 py-[3px] px-[12px]">Connected</Badge>}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-8 pt-[48px]">
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Connection details</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="store-url" className="text-sm font-medium">Store URL</label>
                <Input id="store-url" placeholder={`https://your-store.${platform.id}.com`} />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="api-key" className="text-sm font-medium">API Key</label>
                <Input id="api-key" placeholder="Enter your API key" type="password" />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="api-secret" className="text-sm font-medium">API Secret</label>
                <Input id="api-secret" placeholder="Enter your API secret" type="password" />
              </div>
            </div>

            <div className="border-t mt-[24px] pt-[24px]">
              <div className="flex items-center gap-3">
                {!isConnected ? (
                  <Button onClick={handleConnect} className="w-full" style={{
                    borderRadius: "8px",
                    border: "1px solid #116FAE",
                    backgroundColor: "#116FAE",
                    boxShadow: "0px 2px 4px 0px rgba(13, 87, 136, 0.16)"
                  }} disabled={isConnecting}>
                    {isConnecting ? (
                      <>
                        <Loader className="h-4 w-4 animate-spin mr-2" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <LinkIcon className="h-4 w-4 mr-2" />
                        Connect application
                      </>
                    )}
                  </Button>
                ) : (
                  <Button 
                    onClick={handleDisconnect} 
                    variant="outline" 
                    className="w-full" 
                    style={{
                      borderRadius: "8px",
                      border: "1px solid #8A8A8A",
                      backgroundColor: "#FFFFFF",
                      boxShadow: "0px 2px 4px 0px rgba(37, 38, 38, 0.08)"
                    }}
                    disabled={isDisconnecting}
                  >
                    {isDisconnecting ? (
                      <>
                        <Loader className="h-4 w-4 animate-spin mr-2" />
                        Disconnecting...
                      </>
                    ) : (
                      <>
                        <Link2Off className="h-4 w-4 mr-2" />
                        Disconnect application
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
          
          <div>
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Setup instructions</h3>
              
              <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center mb-4">
                <div className="text-gray-500">Video tutorial</div>
              </div>
              
              <ol className="list-decimal pl-5 space-y-3 text-sm">
                <li>Log in to your {platform.name} admin panel</li>
                <li>Navigate to Settings → Apps and sales channels</li>
                <li>Click "Develop apps" and then "Create an app"</li>
                <li>Name your app and add the required permissions</li>
                <li>Copy the API credentials and paste them in the fields on the left</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
