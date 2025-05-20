
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WordpressConnectionForm } from "./WordpressConnectionForm";
import { WordpressImportForm } from "./WordpressImportForm";

export const WordpressTabsContainer = () => {
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

  const handleConnect = () => {
    if (isConnecting) return;
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
          <WordpressConnectionForm 
            wordpressUrl={wordpressUrl}
            setWordpressUrl={setWordpressUrl}
            consumerKey={consumerKey}
            setConsumerKey={setConsumerKey}
            consumerSecret={consumerSecret}
            setConsumerSecret={setConsumerSecret}
            isConnecting={isConnecting}
            isConnected={isConnected}
            handleConnect={handleConnect}
          />
        </TabsContent>
        
        <TabsContent value="import" className="mt-4 bg-[#FFFFFF] rounded-[16px] p-6">
          {isConnected && (
            <WordpressImportForm 
              wordpressUrl={wordpressUrl}
              importUsers={importUsers}
              setImportUsers={setImportUsers}
              importOrders={importOrders}
              setImportOrders={setImportOrders}
              isImporting={isImporting}
              importSuccess={importSuccess}
              usersCount={usersCount}
              ordersCount={ordersCount}
              handleImport={handleImport}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
