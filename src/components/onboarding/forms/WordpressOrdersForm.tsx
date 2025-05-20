
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Loader2, Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

export const WordpressOrdersForm = () => {
  const [activeTab, setActiveTab] = useState<"settings" | "import">("settings");
  const [wordpressUrl, setWordpressUrl] = useState("");
  const [consumerKey, setConsumerKey] = useState("");
  const [consumerSecret, setConsumerSecret] = useState("");
  const [importUsers, setImportUsers] = useState(true);
  const [importOrders, setImportOrders] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);
  const [usersCount, setUsersCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);

  const isFormValid = () => {
    return wordpressUrl.trim() !== "" && consumerKey.trim() !== "" && consumerSecret.trim() !== "";
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
      setUsersCount(Math.floor(Math.random() * 800) + 400);
      setOrdersCount(Math.floor(Math.random() * 600) + 300);
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
        </TabsContent>
        
        <TabsContent value="import" className="mt-0 bg-[#F2F2F2] rounded-[16px] p-6">
          {isConnected && (
            <div className="space-y-4">
              <div className="flex items-center">
                <Badge variant="blue" className="text-xs px-[12px] py-[3px]">
                  <Check size={14} className="mr-1" />
                  Connected to {wordpressUrl}
                </Badge>
              </div>
              
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-medium mb-2">Available data to import:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>{usersCount} users</li>
                  <li>{ordersCount} orders</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="import-users" 
                    checked={importUsers}
                    onCheckedChange={(checked) => setImportUsers(checked === true)}
                  />
                  <Label htmlFor="import-users">Import users</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="import-orders" 
                    checked={importOrders}
                    onCheckedChange={(checked) => setImportOrders(checked === true)}
                  />
                  <Label htmlFor="import-orders">Import orders</Label>
                </div>
              </div>
              
              {importSuccess ? (
                <div className="flex items-center gap-4">
                  <Button disabled className="opacity-75 border border-[#116FAE] bg-[#116FAE] rounded-[8px]">
                    <Check className="mr-2 h-4 w-4" /> Successfully imported
                  </Button>
                  <Badge variant="green" className="flex items-center gap-2 px-[12px] py-[3px]">
                    <Check size={14} className="text-[#2D7048]" />
                    <span className="text-sm">
                      {importUsers ? `${usersCount} users` : ""}
                      {importUsers && importOrders ? " and " : ""}
                      {importOrders ? `${ordersCount} orders` : ""} successfully imported
                    </span>
                  </Badge>
                </div>
              ) : (
                <Button 
                  onClick={handleImport}
                  disabled={isImporting || (!importUsers && !importOrders)}
                  className="border border-[#116FAE] bg-[#116FAE] hover:bg-[#0D5788] hover:border-[#0D5788] rounded-[8px]"
                >
                  {isImporting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isImporting ? "Importing..." : "Import Selected Data"}
                </Button>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
