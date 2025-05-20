
import { useState, useEffect } from "react";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";

export const useWordpressState = () => {
  const [activeTab, setActiveTab] = useLocalStorageState("onboarding.wordpress-orders.activeTab", "settings");
  const [wordpressUrl, setWordpressUrl] = useLocalStorageState("onboarding.wordpress-orders.url", "");
  const [consumerKey, setConsumerKey] = useLocalStorageState("onboarding.wordpress-orders.consumerKey", "");
  const [consumerSecret, setConsumerSecret] = useLocalStorageState("onboarding.wordpress-orders.consumerSecret", "");
  const [importUsers, setImportUsers] = useLocalStorageState("onboarding.wordpress-orders.importUsers", true);
  const [importOrders, setImportOrders] = useLocalStorageState("onboarding.wordpress-orders.importOrders", true);
  const [isConnecting, setIsConnecting] = useLocalStorageState("onboarding.wordpress-orders.isConnecting", false);
  const [isConnected, setIsConnected] = useLocalStorageState("onboarding.wordpress-orders.isConnected", false);
  const [isImporting, setIsImporting] = useLocalStorageState("onboarding.wordpress-orders.isImporting", false);
  const [importSuccess, setImportSuccess] = useLocalStorageState("onboarding.wordpress-orders.importSuccess", false);
  const [usersCount, setUsersCount] = useLocalStorageState("onboarding.wordpress-orders.usersCount", 0);
  const [ordersCount, setOrdersCount] = useLocalStorageState("onboarding.wordpress-orders.ordersCount", 0);

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
