
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Loader2, Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const SalesforceOrdersForm = () => {
  const [activeTab, setActiveTab] = useState<"settings" | "import">("settings");
  const [salesforceDomain, setSalesforceDomain] = useState("");
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [dataType, setDataType] = useState("both");
  const [timeframe, setTimeframe] = useState("all");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);
  const [contactsCount, setContactsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);

  const isFormValid = () => {
    return salesforceDomain.trim() !== "" && clientId.trim() !== "" && clientSecret.trim() !== "";
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
      setContactsCount(Math.floor(Math.random() * 1200) + 800);
      setOrdersCount(Math.floor(Math.random() * 900) + 600);
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
              <Label htmlFor="salesforce-domain">Salesforce Domain</Label>
              <Input 
                id="salesforce-domain" 
                placeholder="your-domain.my.salesforce.com" 
                className="mt-1" 
                value={salesforceDomain} 
                onChange={e => setSalesforceDomain(e.target.value)} 
              />
            </div>
            
            <div>
              <Label htmlFor="client-id">Client ID</Label>
              <Input 
                id="client-id" 
                placeholder="Enter your Salesforce client ID" 
                className="mt-1" 
                value={clientId} 
                onChange={e => setClientId(e.target.value)} 
              />
            </div>
            
            <div>
              <Label htmlFor="client-secret">Client Secret</Label>
              <Input 
                id="client-secret" 
                type="password" 
                placeholder="Enter your Salesforce client secret" 
                className="mt-1" 
                value={clientSecret} 
                onChange={e => setClientSecret(e.target.value)} 
              />
              <p className="text-sm text-gray-500 mt-1">
                You can find these in Salesforce Setup &gt; App Manager &gt; Connected Apps
              </p>
            </div>
            
            <Button 
              onClick={handleConnect}
              disabled={!isFormValid() || isConnecting}
              className="border border-[#116FAE] bg-[#116FAE] hover:bg-[#0D5788] hover:border-[#0D5788] rounded-[8px]"
            >
              {isConnecting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isConnecting ? "Connecting..." : isConnected ? "Connected" : "Connect to Salesforce"}
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="import" className="mt-0 bg-[#F2F2F2] rounded-[16px] p-6">
          {isConnected && (
            <div className="space-y-4">
              <div className="flex items-center">
                <Badge variant="blue" className="text-xs px-[12px] py-[3px]">
                  <Check size={14} className="mr-1" />
                  Connected to {salesforceDomain}
                </Badge>
              </div>
              
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-medium mb-2">Available data to import:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>{contactsCount} contacts (users)</li>
                  <li>{ordersCount} opportunities (orders)</li>
                </ul>
              </div>
              
              <div>
                <Label htmlFor="data-type">What to import</Label>
                <Select value={dataType} onValueChange={setDataType}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select data to import" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="both">Both contacts and opportunities</SelectItem>
                    <SelectItem value="contacts">Contacts only</SelectItem>
                    <SelectItem value="opportunities">Opportunities only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="timeframe">Time period</Label>
                <Select value={timeframe} onValueChange={setTimeframe}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All time</SelectItem>
                    <SelectItem value="30days">Last 30 days</SelectItem>
                    <SelectItem value="quarter">Current quarter</SelectItem>
                    <SelectItem value="year">Current year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {importSuccess ? (
                <div className="flex items-center gap-4">
                  <Button disabled className="opacity-75 border border-[#116FAE] bg-[#116FAE] rounded-[8px]">
                    <Check className="mr-2 h-4 w-4" /> Successfully imported
                  </Button>
                  <Badge variant="green" className="flex items-center gap-2 px-[12px] py-[3px]">
                    <Check size={14} className="text-[#2D7048]" />
                    <span className="text-sm">
                      {dataType === "both" || dataType === "contacts" ? `${contactsCount} users` : ""}
                      {((dataType === "both") && (dataType === "opportunities" || dataType === "both")) ? " and " : ""}
                      {dataType === "both" || dataType === "opportunities" ? `${ordersCount} orders` : ""} successfully imported
                    </span>
                  </Badge>
                </div>
              ) : (
                <Button 
                  onClick={handleImport}
                  disabled={isImporting}
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
