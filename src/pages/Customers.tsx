
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { CustomersDataTable } from "@/components/customers/CustomersDataTable";

const Customers = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-text-dark">Customers</h1>
        </div>

        <div className="space-y-4">
          <CustomersDataTable />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Customers;
