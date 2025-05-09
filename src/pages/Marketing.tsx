
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MarketingStats } from "@/components/marketing/MarketingStats";
import { MarketingCampaignsTable } from "@/components/marketing/MarketingCampaignsTable";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const Marketing = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-text-dark">Marketing</h1>
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            New campaign
          </Button>
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
