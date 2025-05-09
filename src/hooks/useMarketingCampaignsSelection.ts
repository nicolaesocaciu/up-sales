
import { useState } from "react";
import { Campaign } from "@/types/campaign";

export interface UseMarketingCampaignsSelectionProps {
  paginatedCampaigns: Campaign[];
}

export const useMarketingCampaignsSelection = ({ paginatedCampaigns }: UseMarketingCampaignsSelectionProps) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(paginatedCampaigns.map(campaign => campaign.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowSelect = (campaignId: string, checked: boolean) => {
    setSelectedRows(prev => {
      if (checked) {
        return [...prev, campaignId];
      } else {
        return prev.filter(id => id !== campaignId);
      }
    });
  };

  return {
    selectedRows,
    handleSelectAll,
    handleRowSelect
  };
};
