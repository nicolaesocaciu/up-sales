
import { useState } from "react";

export const useShopifyState = () => {
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

  return {
    activeTab,
    setActiveTab,
    shopifyStore,
    setShopifyStore,
    apiToken,
    setApiToken,
    dataOption,
    setDataOption,
    dateRange,
    setDateRange,
    isConnecting,
    isConnected,
    isImporting,
    importSuccess,
    usersCount,
    ordersCount,
    handleConnect,
    handleImport
  };
};
