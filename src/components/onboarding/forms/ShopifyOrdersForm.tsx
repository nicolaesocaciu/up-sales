
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Loader2, Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const ShopifyOrdersForm = () => {
  const [activeTab, setActiveTab] = useState<"settings" | "import">("settings");
  const [shopifyStore, setShopifyStore] = useState("");
  const [apiToken, setApiToken] = useState("");
  const [dataOption, setDataOption] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);
  const [usersCount, setUsersCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);

  const isFormValid = () => {
    return shopifyStore.trim() !== "" && apiToken.trim() !== "";
  };
  
  const handleConnect = () => {
    if (!isFormValid() || isConnecting) return;
    setIsConnecting(true);

    // Simulate API connection
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      setActiveTab("import");
      // Random data counts for simulation
      setUsersCount(Math.floor(Math.random() * 1000) + 1000);
      setOrdersCount(Math.floor(Math.random() * 1000) + 500);
    }, 2000);
  };
  
  const handleImport = () => {
    if (isImporting || importSuccess) return;
    setIsImporting(true);
    
    // Simulate import
    setTimeout(() => {
      setIsImporting(false);
      setImportSuccess(true);
    }, 3000);
  };
  
  return (
    <div className="mt-8">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "settings" | "import")}>
        <TabsList className="mb-4">
          <TabsTrigger value="settings">Connection Settings</TabsTrigger>
          <TabsTrigger value="import" disabled={!isConnected}>Import Data</TabsTrigger>
        </TabsList>
        
        <TabsContent value="settings" className="mt-0 bg-[#F2F2F2] rounded-[16px] p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="shopify-store">Shopify Store URL</Label>
              <Input 
                id="shopify-store" 
                placeholder="your-store.myshopify.com" 
                className="mt-1" 
                value={shopifyStore} 
                onChange={e => setShopifyStore(e.target.value)} 
              />
            </div>
            
            <div>
              <Label htmlFor="api-token">API Token</Label>
              <Input 
                id="api-token" 
                type="password" 
                placeholder="Enter your Shopify API token" 
                className="mt-1" 
                value={apiToken} 
                onChange={e => setApiToken(e.target.value)} 
              />
            </div>
            
            <div>
              <Label>What data to import</Label>
              <RadioGroup value={dataOption} onValueChange={setDataOption} className="mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="all" />
                  <Label htmlFor="all">All users and orders</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="users" id="users" />
                  <Label htmlFor="users">Users only</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="orders" id="orders" />
                  <Label htmlFor="orders">Orders only</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Button 
              onClick={handleConnect}
              disabled={!isFormValid() || isConnecting}
              className="border border-[#116FAE] bg-[#116FAE] hover:bg-[#0D5788] hover:border-[#0D5788] rounded-[8px]"
            >
              {isConnecting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isConnecting ? "Connecting..." : isConnected ? "Connected" : "Connect to Shopify"}
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="import" className="mt-0 bg-[#F2F2F2] rounded-[16px] p-6">
          {isConnected && (
            <div className="space-y-4">
              <div className="flex items-center">
                <Badge variant="blue" className="text-xs px-[12px] py-[3px]">
                  <Check size={14} className="mr-1" />
                  Connected to {shopifyStore}
                </Badge>
              </div>
              
              <div>
                <Label>Date range for orders</Label>
                <RadioGroup value={dateRange} onValueChange={setDateRange} className="mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="date-all" />
                    <Label htmlFor="date-all">All time</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="30days" id="30days" />
                    <Label htmlFor="30days">Last 30 days</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="90days" id="90days" />
                    <Label htmlFor="90days">Last 90 days</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="12months" id="12months" />
                    <Label htmlFor="12months">Last 12 months</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-medium mb-2">Available data to import:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>{usersCount} users</li>
                  <li>{ordersCount} orders</li>
                </ul>
              </div>
              
              {importSuccess ? (
                <div className="flex items-center gap-4">
                  <Button disabled className="opacity-75 border border-[#116FAE] bg-[#116FAE] rounded-[8px]">
                    <Check className="mr-2 h-4 w-4" /> Successfully imported
                  </Button>
                  <Badge variant="green" className="flex items-center gap-2 px-[12px] py-[3px]">
                    <Check size={14} className="text-[#2D7048]" />
                    <span className="text-sm">{usersCount} users and {ordersCount} orders successfully imported</span>
                  </Badge>
                </div>
              ) : (
                <Button 
                  onClick={handleImport}
                  disabled={isImporting}
                  className="border border-[#116FAE] bg-[#116FAE] hover:bg-[#0D5788] hover:border-[#0D5788] rounded-[8px]"
                >
                  {isImporting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isImporting ? "Importing..." : "Import Data"}
                </Button>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
