
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ReportsTable } from "@/components/content/ReportsTable";
import { ContractsTable } from "@/components/content/ContractsTable";

const Content = () => {
  return (
    <DashboardLayout>
      <div className="container py-6 space-y-8">
        <h1 className="text-3xl font-bold">Content</h1>
        
        <div className="space-y-8">
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
