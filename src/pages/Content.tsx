
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ReportsTable } from "@/components/content/ReportsTable";
import { ContractsTable } from "@/components/content/ContractsTable";

const Content = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-text-dark">Content</h1>
        
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Reports</h2>
            <ReportsTable />
          </div>
          
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Contracts</h2>
            <ContractsTable />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Content;
