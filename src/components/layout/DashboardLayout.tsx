
import { TopBar } from "./TopBar";
import { Sidebar } from "./Sidebar";
import { useState } from "react";

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-content !bg-[#252626]">
      <TopBar />
      <div className="flex pt-16">
        <Sidebar onCollapse={(collapsed) => setIsCollapsed(collapsed)} />
        <main className={`flex-1 p-6 transition-[margin-left] duration-300 ${
          isCollapsed ? "ml-16" : "ml-16 lg:ml-64"
        } overflow-y-auto h-[calc(100vh-64px)] bg-white rounded-[24px]`}>
          {children}
        </main>
      </div>
    </div>
  );
};
