
import { 
  ShopifyConnectionForm, 
  ShopifyImportForm,
  ShopifyTabsContainer
} from "./shopify-orders";
import { useShopifyState } from "./shopify-orders/useShopifyState";

export const ShopifyOrdersForm = () => {
  const {
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
  } = useShopifyState();
  
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
