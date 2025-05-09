
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { CustomersDataTable } from "@/components/customers/CustomersDataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Customers = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-text-dark">Customers</h1>
          <Button 
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add customer
          </Button>
        </div>

        <div className="space-y-4">
          <CustomersDataTable />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Customers;
