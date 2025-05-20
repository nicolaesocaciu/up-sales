
import { useState } from "react";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";

export const useSalesforceState = () => {
  const [activeTab, setActiveTab] = useLocalStorageState("onboarding.salesforce-orders.activeTab", "settings");
  const [salesforceDomain, setSalesforceDomain] = useLocalStorageState("onboarding.salesforce-orders.domain", "");
  const [clientId, setClientId] = useLocalStorageState("onboarding.salesforce-orders.clientId", "");
  const [clientSecret, setClientSecret] = useLocalStorageState("onboarding.salesforce-orders.clientSecret", "");
  const [dataType, setDataType] = useLocalStorageState<"both" | "contacts" | "opportunities">("onboarding.salesforce-orders.dataType", "both");
  const [timeframe, setTimeframe] = useLocalStorageState("onboarding.salesforce-orders.timeframe", "all");
  const [isConnecting, setIsConnecting] = useLocalStorageState("onboarding.salesforce-orders.isConnecting", false);
  const [isConnected, setIsConnected] = useLocalStorageState("onboarding.salesforce-orders.isConnected", false);
  const [isImporting, setIsImporting] = useLocalStorageState("onboarding.salesforce-orders.isImporting", false);
  const [importSuccess, setImportSuccess] = useLocalStorageState("onboarding.salesforce-orders.importSuccess", false);
  const [contactsCount, setContactsCount] = useLocalStorageState("onboarding.salesforce-orders.contactsCount", 0);
  const [ordersCount, setOrdersCount] = useLocalStorageState("onboarding.salesforce-orders.ordersCount", 0);

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
