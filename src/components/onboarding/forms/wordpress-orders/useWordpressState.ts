
import { useState, useEffect } from "react";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";
import { ONBOARDING_STORAGE_KEYS } from "../../hooks/useOnboardingStorage";

export const useWordpressState = () => {
  const [activeTab, setActiveTab] = useLocalStorageState(`${ONBOARDING_STORAGE_KEYS.USERS_ORDERS}.wordpress.activeTab`, "settings");
  const [wordpressUrl, setWordpressUrl] = useLocalStorageState(`${ONBOARDING_STORAGE_KEYS.USERS_ORDERS}.wordpress.url`, "");
  const [consumerKey, setConsumerKey] = useLocalStorageState(`${ONBOARDING_STORAGE_KEYS.USERS_ORDERS}.wordpress.consumerKey`, "");
  const [consumerSecret, setConsumerSecret] = useLocalStorageState(`${ONBOARDING_STORAGE_KEYS.USERS_ORDERS}.wordpress.consumerSecret`, "");
  const [importUsers, setImportUsers] = useLocalStorageState(`${ONBOARDING_STORAGE_KEYS.USERS_ORDERS}.wordpress.importUsers`, true);
  const [importOrders, setImportOrders] = useLocalStorageState(`${ONBOARDING_STORAGE_KEYS.USERS_ORDERS}.wordpress.importOrders`, true);
  const [isConnecting, setIsConnecting] = useLocalStorageState(`${ONBOARDING_STORAGE_KEYS.USERS_ORDERS}.wordpress.isConnecting`, false);
  const [isConnected, setIsConnected] = useLocalStorageState(`${ONBOARDING_STORAGE_KEYS.USERS_ORDERS}.wordpress.isConnected`, false);
  const [isImporting, setIsImporting] = useLocalStorageState(`${ONBOARDING_STORAGE_KEYS.USERS_ORDERS}.wordpress.isImporting`, false);
  const [importSuccess, setImportSuccess] = useLocalStorageState(`${ONBOARDING_STORAGE_KEYS.USERS_ORDERS}.wordpress.importSuccess`, false);
  const [usersCount, setUsersCount] = useLocalStorageState(`${ONBOARDING_STORAGE_KEYS.USERS_ORDERS}.wordpress.usersCount`, 0);
  const [ordersCount, setOrdersCount] = useLocalStorageState(`${ONBOARDING_STORAGE_KEYS.USERS_ORDERS}.wordpress.ordersCount`, 0);

  const handleConnect = () => {
    if (!isConnected && !isConnecting) {
      setIsConnecting(true);

      // Simulate API connection
      setTimeout(() => {
        setIsConnecting(false);
        setIsConnected(true);
        setActiveTab("import");
        // Random data counts for simulation
        setUsersCount(Math.floor(Math.random() * 1200) + 800);
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
