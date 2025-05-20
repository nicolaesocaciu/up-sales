
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SalesforceConnectionForm } from "./SalesforceConnectionForm";
import { SalesforceImportForm } from "./SalesforceImportForm";

export const SalesforceTabsContainer = () => {
  const [activeTab, setActiveTab] = useState<"settings" | "import">("settings");
  const [salesforceDomain, setSalesforceDomain] = useState("");
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [dataType, setDataType] = useState<"both" | "contacts" | "opportunities">("both");
  const [timeframe, setTimeframe] = useState("all");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);
  const [contactsCount, setContactsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);

  const handleConnect = () => {
    if (!isConnected && !isConnecting) {
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
    }
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
        <TabsList className="w-full grid grid-cols-2 bg-white border border-gray-200 rounded-md h-9 p-0">
          <TabsTrigger 
            value="settings" 
            className="data-[state=active]:bg-[#116FAE] data-[state=active]:text-white rounded-md"
          >
            Connection Settings
          </TabsTrigger>
          <TabsTrigger 
            value="import" 
            disabled={!isConnected}
            className="data-[state=active]:bg-[#116FAE] data-[state=active]:text-white rounded-md"
          >
            Import Data
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="settings" className="mt-4 bg-[#FFFFFF] rounded-[16px] p-6">
          <SalesforceConnectionForm 
            salesforceDomain={salesforceDomain}
            setSalesforceDomain={setSalesforceDomain}
            clientId={clientId}
            setClientId={setClientId}
            clientSecret={clientSecret}
            setClientSecret={setClientSecret}
            isConnecting={isConnecting}
            isConnected={isConnected}
            handleConnect={handleConnect}
          />
        </TabsContent>
        
        <TabsContent value="import" className="mt-4 bg-[#FFFFFF] rounded-[16px] p-6">
          {isConnected && (
            <SalesforceImportForm 
              salesforceDomain={salesforceDomain}
              dataType={dataType}
              setDataType={setDataType}
              timeframe={timeframe}
              setTimeframe={setTimeframe}
              isImporting={isImporting}
              importSuccess={importSuccess}
              contactsCount={contactsCount}
              ordersCount={ordersCount}
              handleImport={handleImport}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
