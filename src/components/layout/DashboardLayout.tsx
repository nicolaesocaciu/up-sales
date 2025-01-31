import { TopBar } from "./TopBar";
import { Sidebar } from "./Sidebar";

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-content">
      <TopBar />
      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1 p-6 ml-16 lg:ml-64">{children}</main>
      </div>
    </div>
  );
};