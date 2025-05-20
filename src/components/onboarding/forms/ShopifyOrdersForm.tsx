
import { useState } from "react";
import { 
  ShopifyConnectionForm, 
  ShopifyImportForm,
  ShopifyTabsContainer
} from "./shopify-orders";

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
  
  const handleConnect = () => {
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
      <ShopifyTabsContainer
        activeTab={activeTab}
        isConnected={isConnected}
        onTabChange={setActiveTab}
        settingsContent={
          <ShopifyConnectionForm
            shopifyStore={shopifyStore}
            setShopifyStore={setShopifyStore}
            apiToken={apiToken}
            setApiToken={setApiToken}
            dataOption={dataOption}
            setDataOption={setDataOption}
            isConnecting={isConnecting}
            handleConnect={handleConnect}
          />
        }
        importContent={
          isConnected && (
            <ShopifyImportForm
              shopifyStore={shopifyStore}
              dateRange={dateRange}
              setDateRange={setDateRange}
              usersCount={usersCount}
              ordersCount={ordersCount}
              isImporting={isImporting}
              importSuccess={importSuccess}
              handleImport={handleImport}
            />
          )
        }
      />
    </div>
  );
};
