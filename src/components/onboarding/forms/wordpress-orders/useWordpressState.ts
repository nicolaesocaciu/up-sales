
import { useState } from "react";

export const useWordpressState = () => {
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

  return {
    activeTab,
    setActiveTab,
    wordpressUrl,
    setWordpressUrl,
    consumerKey,
    setConsumerKey,
    consumerSecret,
    setConsumerSecret,
    importUsers,
    setImportUsers,
    importOrders,
    setImportOrders,
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
