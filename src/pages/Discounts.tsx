
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useState } from "react";
import { DiscountStatus } from "@/types/discount";
import { DiscountsDataTable } from "@/components/discounts/DiscountsDataTable";
import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";

const Discounts = () => {
  const [statusFilter] = useState<DiscountStatus | null>(null);
  
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Discount</h1>
          <div className="flex items-center gap-4">
            <Button 
              variant="outline"
              className="h-10 rounded-lg border-[#8A8A8A] bg-white shadow-sm"
            >
              <FileText className="h-4 w-4 mr-2" />
              Export
            </Button>
            
            <Button 
              className="h-10 rounded-lg bg-[#116FAE] hover:bg-[#0D5788] border-[#116FAE] hover:border-[#0D5788] shadow-[0px_2px_4px_0px_rgba(13,87,136,0.16)]"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Discount
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col">
          <DiscountsDataTable statusFilter={statusFilter} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Discounts;
