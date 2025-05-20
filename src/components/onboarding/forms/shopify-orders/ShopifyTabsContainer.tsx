import { ReactNode } from "react";
type ShopifyTabsContainerProps = {
  activeTab: "settings" | "import";
  isConnected: boolean;
  onTabChange: (tab: "settings" | "import") => void;
  settingsContent: ReactNode;
  importContent: ReactNode;
};
export const ShopifyTabsContainer = ({
  activeTab,
  isConnected,
  onTabChange,
  settingsContent,
  importContent
}: ShopifyTabsContainerProps) => {
  return <div className="mt-8">
      <div className="w-full grid grid-cols-2 bg-white border border-gray-200 rounded-md h-9 p-0">
        <button className={`
            transition-colors rounded-md
            ${activeTab === "settings" ? "bg-[#116FAE] text-white" : "bg-white hover:bg-gray-50"}
          `} onClick={() => onTabChange("settings")}>
          Connection Settings
        </button>
        <button className={`
            transition-colors rounded-md
            ${activeTab === "import" ? "bg-[#116FAE] text-white" : "bg-white hover:bg-gray-50"}
            ${!isConnected ? "opacity-50 cursor-not-allowed" : ""}
          `} onClick={() => isConnected ? onTabChange("import") : null} disabled={!isConnected}>
          Import Data
        </button>
      </div>

      <div className="mt-4">
        {activeTab === "settings" ? settingsContent : importContent}
      </div>
    </div>;
};