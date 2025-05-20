
import { useState } from "react";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";
import { ONBOARDING_STORAGE_KEYS } from "../../hooks/useOnboardingStorage";

export const useSalesforceState = () => {
  const [activeTab, setActiveTab] = useLocalStorageState(`${ONBOARDING_STORAGE_KEYS.USERS_ORDERS}.salesforce.activeTab`, "settings");
  const [salesforceDomain, setSalesforceDomain] = useLocalStorageState(`${ONBOARDING_STORAGE_KEYS.USERS_ORDERS}.salesforce.domain`, "");
  const [clientId, setClientId] = useLocalStorageState(`${ONBOARDING_STORAGE_KEYS.USERS_ORDERS}.salesforce.clientId`, "");
  const [clientSecret, setClientSecret] = useLocalStorageState(`${ONBOARDING_STORAGE_KEYS.USERS_ORDERS}.salesforce.clientSecret`, "");
  const [dataType, setDataType] = useLocalStorageState<"both" | "contacts" | "opportunities">(`${ONBOARDING_STORAGE_KEYS.USERS_ORDERS}.salesforce.dataType`, "both");
  const [timeframe, setTimeframe] = useLocalStorageState(`${ONBOARDING_STORAGE_KEYS.USERS_ORDERS}.salesforce.timeframe`, "all");
  const [isConnecting, setIsConnecting] = useLocalStorageState(`${ONBOARDING_STORAGE_KEYS.USERS_ORDERS}.salesforce.isConnecting`, false);
  const [isConnected, setIsConnected] = useLocalStorageState(`${ONBOARDING_STORAGE_KEYS.USERS_ORDERS}.salesforce.isConnected`, false);
  const [isImporting, setIsImporting] = useLocalStorageState(`${ONBOARDING_STORAGE_KEYS.USERS_ORDERS}.salesforce.isImporting`, false);
  const [importSuccess, setImportSuccess] = useLocalStorageState(`${ONBOARDING_STORAGE_KEYS.USERS_ORDERS}.salesforce.importSuccess`, false);
  const [contactsCount, setContactsCount] = useLocalStorageState(`${ONBOARDING_STORAGE_KEYS.USERS_ORDERS}.salesforce.contactsCount`, 0);
  const [ordersCount, setOrdersCount] = useLocalStorageState(`${ONBOARDING_STORAGE_KEYS.USERS_ORDERS}.salesforce.ordersCount`, 0);

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
