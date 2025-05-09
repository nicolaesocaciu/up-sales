
import { TopBar } from "./TopBar";
import Sidebar from "./Sidebar"; // Changed from import { Sidebar } to import Sidebar
import { useState, useEffect } from "react";

const SIDEBAR_STATE_KEY = "sidebar-collapsed-state";

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  // Initialize state from localStorage to match the sidebar's state
  const [isCollapsed, setIsCollapsed] = useState(() => {
    try {
      const savedState = localStorage.getItem(SIDEBAR_STATE_KEY);
      return savedState ? JSON.parse(savedState) === true : false;
    } catch {
      return false;
    }
  });

  // Handle sidebar collapse state change
  const handleSidebarCollapse = (collapsed: boolean) => {
    setIsCollapsed(collapsed);
  };

  return (
    <div className="min-h-screen bg-content !bg-[#252626]">
      <TopBar />
      <div className="flex pt-16">
        <Sidebar onCollapse={handleSidebarCollapse} />
        <main className={`flex-1 px-12 pt-8 pb-16 transition-[margin-left] duration-300 ${
          isCollapsed ? "ml-16" : "ml-[300px]"
        } overflow-y-auto h-[calc(100vh-64px)] bg-[#F2F2F2] rounded-tl-[24px]`}>
          {children}
        </main>
      </div>
    </div>
  );
};
