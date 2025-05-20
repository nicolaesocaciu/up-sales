
import { useState } from "react";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";
import { ONBOARDING_STORAGE_KEYS } from "../../hooks/useOnboardingStorage";

export const useShopifyState = () => {
  const [activeTab, setActiveTab] = useLocalStorageState(`${ONBOARDING_STORAGE_KEYS.USERS_ORDERS}.shopify.activeTab`, "settings");
  const [shopifyStore, setShopifyStore] = useLocalStorageState(`${ONBOARDING_STORAGE_KEYS.USERS_ORDERS}.shopify.store`, "");
  const [apiToken, setApiToken] = useLocalStorageState(`${ONBOARDING_STORAGE_KEYS.USERS_ORDERS}.shopify.apiToken`, "");
  const [dataOption, setDataOption] = useLocalStorageState(`${ONBOARDING_STORAGE_KEYS.USERS_ORDERS}.shopify.dataOption`, "all");
  const [dateRange, setDateRange] = useLocalStorageState(`${ONBOARDING_STORAGE_KEYS.USERS_ORDERS}.shopify.dateRange`, "all");
  const [isConnecting, setIsConnecting] = useLocalStorageState(`${ONBOARDING_STORAGE_KEYS.USERS_ORDERS}.shopify.isConnecting`, false);
  const [isConnected, setIsConnected] = useLocalStorageState(`${ONBOARDING_STORAGE_KEYS.USERS_ORDERS}.shopify.isConnected`, false);
  const [isImporting, setIsImporting] = useLocalStorageState(`${ONBOARDING_STORAGE_KEYS.USERS_ORDERS}.shopify.isImporting`, false);
  const [importSuccess, setImportSuccess] = useLocalStorageState(`${ONBOARDING_STORAGE_KEYS.USERS_ORDERS}.shopify.importSuccess`, false);
  const [usersCount, setUsersCount] = useLocalStorageState(`${ONBOARDING_STORAGE_KEYS.USERS_ORDERS}.shopify.usersCount`, 0);
  const [ordersCount, setOrdersCount] = useLocalStorageState(`${ONBOARDING_STORAGE_KEYS.USERS_ORDERS}.shopify.ordersCount`, 0);
  
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
