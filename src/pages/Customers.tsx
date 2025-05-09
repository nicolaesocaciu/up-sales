
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { CustomersDataTable } from "@/components/customers/CustomersDataTable";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";

const Customers = () => {
  const queryClient = useQueryClient();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await queryClient.invalidateQueries({ queryKey: ['customers'] });
      toast.success("Customer data refreshed");
    } catch (error) {
      console.error("Error refreshing data:", error);
      toast.error("Failed to refresh data");
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-text-dark">Customers</h1>
          <div className="flex gap-3">
            <Button 
              variant="outline"
              className="gap-2"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button 
              className="gap-2 border border-[#116FAE] bg-[#116FAE] shadow-[0px_2px_4px_0px_rgba(13,87,136,0.16)] hover:border-[#0D5788] hover:bg-[#0D5788] active:border-[#14476A] active:bg-[#14476A] rounded-[8px]"
            >
              <Plus className="h-4 w-4" />
              Add customer
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <CustomersDataTable />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Customers;
