import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WordpressConnectionForm } from "./WordpressConnectionForm";
import { WordpressImportForm } from "./WordpressImportForm";
import { useWordpressState } from "./useWordpressState";
export const WordpressTabsContainer = () => {
  const {
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
  } = useWordpressState();
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
          <WordpressConnectionForm wordpressUrl={wordpressUrl} setWordpressUrl={setWordpressUrl} consumerKey={consumerKey} setConsumerKey={setConsumerKey} consumerSecret={consumerSecret} setConsumerSecret={setConsumerSecret} isConnecting={isConnecting} isConnected={isConnected} handleConnect={handleConnect} />
        </TabsContent>
        
        <TabsContent value="import" className="mt-4 bg-[#FFFFFF] rounded-[16px] p-6">
          {isConnected && <WordpressImportForm wordpressUrl={wordpressUrl} importUsers={importUsers} setImportUsers={setImportUsers} importOrders={importOrders} setImportOrders={setImportOrders} isImporting={isImporting} importSuccess={importSuccess} usersCount={usersCount} ordersCount={ordersCount} handleImport={handleImport} />}
        </TabsContent>
      </Tabs>
    </div>;
};