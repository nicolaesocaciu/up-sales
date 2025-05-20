
import { useState } from "react";

export const useSalesforceState = () => {
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

  return {
    activeTab,
    setActiveTab,
    salesforceDomain,
    setSalesforceDomain,
    clientId,
    setClientId,
    clientSecret,
    setClientSecret,
    dataType,
    setDataType,
    timeframe,
    setTimeframe,
    isConnecting,
    isConnected,
    isImporting,
    importSuccess,
    contactsCount,
    ordersCount,
    handleConnect,
    handleImport
  };
};
