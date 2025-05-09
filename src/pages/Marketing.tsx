
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MarketingStats } from "@/components/marketing/MarketingStats";
import { MarketingCampaignsTable } from "@/components/marketing/MarketingCampaignsTable";

const Marketing = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-text-dark">Marketing</h1>
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
