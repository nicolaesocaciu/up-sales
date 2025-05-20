
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Platform = {
  id: string;
  name: string;
  selected: boolean;
  icon?: React.ReactNode;
  logoUrl?: string;
  connected?: boolean;
};

type PlatformDetailsProps = {
  platform: Platform;
  onBack: () => void;
  onConnect: () => void;
};

export const PlatformDetails = ({ platform, onBack, onConnect }: PlatformDetailsProps) => {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="p-6 flex flex-col">
        <button 
          onClick={onBack}
          className="self-start text-[#116fae] hover:underline flex items-center mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to all applications
        </button>
        
        <div className="flex items-center mb-6">
          {platform.logoUrl && (
            <img 
              src={platform.logoUrl} 
              alt={`${platform.name} logo`} 
              className="h-10 w-10 mr-4 object-contain" 
            />
          )}
          <h2 className="text-2xl font-semibold">{platform.name} integration</h2>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
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
          </div>
          
          <div>
            <Separator orientation="vertical" className="hidden md:block absolute left-0 h-full mx-4" />
            <Separator className="md:hidden mb-6" />
            
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
      
      <div className="border-t p-6 mt-auto">
        <Button 
          onClick={onConnect} 
          className="w-full"
          style={{
            borderRadius: "8px",
            border: "1px solid #116FAE",
            backgroundColor: "#116FAE",
            boxShadow: "0px 2px 4px 0px rgba(13, 87, 136, 0.16)"
          }}
        >
          Connect application
        </Button>
      </div>
    </div>
  );
};
