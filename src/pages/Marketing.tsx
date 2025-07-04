
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MarketingStats } from "@/components/marketing/MarketingStats";
import { MarketingCampaignsTable } from "@/components/marketing/MarketingCampaignsTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Marketing = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-[#252626]">Marketing</h1>
          <div className="flex gap-2">
            <Button 
              variant="outline"
              className="gap-2 h-[36px]"
            >
              Export
            </Button>
            <Button 
              onClick={() => {}} 
              className="gap-2 h-[36px]"
            >
              <Plus className="h-4 w-4" />
              Add campaign
            </Button>
          </div>
        </div>

        <MarketingStats />
        
        <div className="space-y-4">
          <MarketingCampaignsTable />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Marketing;
