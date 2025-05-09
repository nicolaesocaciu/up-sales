
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ReportsTable } from "@/components/content/ReportsTable";
import { ContractsTable } from "@/components/content/ContractsTable";

const Content = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-[#252626]">Content</h1>
        
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-6">
            <ReportsTable />
          </div>
          
          <div className="bg-white rounded-xl p-6">
            <ContractsTable />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Content;
