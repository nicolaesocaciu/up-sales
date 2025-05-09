
import { useState, useMemo } from "react";
import { Campaign } from "@/types/campaign";

export interface UseMarketingCampaignsPaginationProps {
  filteredCampaigns: Campaign[];
}

export const useMarketingCampaignsPagination = ({ filteredCampaigns }: UseMarketingCampaignsPaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [campaignsPerPage, setCampaignsPerPage] = useState(20);

  const paginatedCampaigns = useMemo(() => {
    const startIndex = (currentPage - 1) * campaignsPerPage;
    return filteredCampaigns.slice(startIndex, startIndex + campaignsPerPage);
  }, [filteredCampaigns, currentPage, campaignsPerPage]);

  const handleCampaignsPerPageChange = (value: string) => {
    setCampaignsPerPage(parseInt(value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  return {
    currentPage,
    setCurrentPage,
    campaignsPerPage,
    paginatedCampaigns,
    handleCampaignsPerPageChange
  };
};
