import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SalesforceConnectionForm } from "./SalesforceConnectionForm";
import { SalesforceImportForm } from "./SalesforceImportForm";
import { useSalesforceState } from "./useSalesforceState";
export const SalesforceTabsContainer = () => {
  const {
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
  } = useSalesforceState();
  return <div className="mt-8">
      <Tabs value={activeTab} onValueChange={value => setActiveTab(value as "settings" | "import")}>
        <TabsList className="w-full grid grid-cols-2 bg-white border border-gray-200 rounded-md h-9 p-0">
          <TabsTrigger value="settings" className="data-[state=active]:bg-[#116FAE] data-[state=active]:text-white rounded-md">
            Connection Settings
          </TabsTrigger>
          <TabsTrigger value="import" disabled={!isConnected} className="data-[state=active]:bg-[#116FAE] data-[state=active]:text-white rounded-md">
            Import Data
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="settings" className="space-y-4  py-6">
          <SalesforceConnectionForm salesforceDomain={salesforceDomain} setSalesforceDomain={setSalesforceDomain} clientId={clientId} setClientId={setClientId} clientSecret={clientSecret} setClientSecret={setClientSecret} isConnecting={isConnecting} isConnected={isConnected} handleConnect={handleConnect} />
        </TabsContent>
        
        <TabsContent value="import" className="mt-4 bg-[#FFFFFF] rounded-[16px] p-6">
          {isConnected && <SalesforceImportForm salesforceDomain={salesforceDomain} dataType={dataType} setDataType={setDataType} timeframe={timeframe} setTimeframe={setTimeframe} isImporting={isImporting} importSuccess={importSuccess} contactsCount={contactsCount} ordersCount={ordersCount} handleImport={handleImport} />}
        </TabsContent>
      </Tabs>
    </div>;
};