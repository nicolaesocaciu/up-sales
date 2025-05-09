import { useState, useMemo } from "react";
import { Campaign } from "@/types/campaign";

// Sample marketing campaigns data
const marketingCampaignsData: Campaign[] = [
  {
    id: "1",
    name: "Summer Sale Newsletter",
    type: "Email marketing",
    status: "Sent",
    lastUpdated: "22-08-2023",
    openRate: { value: 11.6, count: 0 },
    subscribedRate: { value: 5.6, count: 0 },
    activeRate: { value: 4.6, count: 0 }
  },
  {
    id: "2",
    name: "New Product Launch",
    type: "Business marketing",
    status: "Draft",
    lastUpdated: "20-08-2023",
    openRate: { value: 15.6, count: 0 },
    subscribedRate: { value: 10.6, count: 0 },
    activeRate: { value: 9.4, count: 0 }
  },
  {
    id: "3",
    name: "Flash Sale Promotion",
    type: "e-commerce marketing",
    status: "Sent",
    lastUpdated: "17-08-2023",
    openRate: { value: 19.6, count: 0 },
    subscribedRate: { value: 13.7, count: 0 },
    activeRate: { value: 10.4, count: 0 }
  },
  {
    id: "4",
    name: "Weekly Customer Newsletter",
    type: "Email marketing",
    status: "Sent",
    lastUpdated: "15-08-2023",
    openRate: { value: 22.9, count: 0 },
    subscribedRate: { value: 19.7, count: 0 },
    activeRate: { value: 13.4, count: 0 }
  },
  {
    id: "5",
    name: "B2B Relationship Campaign",
    type: "Business marketing",
    status: "Draft",
    lastUpdated: "05-08-2023",
    openRate: { value: 15.9, count: 0 },
    subscribedRate: { value: 9.7, count: 0 },
    activeRate: { value: 11.4, count: 0 }
  },
  {
    id: "6",
    name: "Holiday Shopping Guide",
    type: "e-commerce marketing",
    status: "Draft",
    lastUpdated: "31-07-2023",
    openRate: { value: 28.2, count: 0 },
    subscribedRate: { value: 12.5, count: 0 },
    activeRate: { value: 6.4, count: 0 }
  },
  {
    id: "7",
    name: "Lead Generation Campaign",
    type: "Business marketing",
    status: "Sent",
    lastUpdated: "28-07-2023",
    openRate: { value: 8.1, count: 0 },
    subscribedRate: { value: 2.9, count: 0 },
    activeRate: { value: 9.4, count: 0 }
  },
  {
    id: "8",
    name: "Corporate Partnership Outreach",
    type: "Business marketing",
    status: "Sent",
    lastUpdated: "22-07-2023",
    openRate: { value: 12.6, count: 0 },
    subscribedRate: { value: 8.4, count: 0 },
    activeRate: { value: 8.4, count: 0 }
  },
  {
    id: "9",
    name: "Seasonal Clearance Sale",
    type: "e-commerce marketing",
    status: "Draft",
    lastUpdated: "19-07-2023",
    openRate: { value: 14.6, count: 0 },
    subscribedRate: { value: 6.1, count: 0 },
    activeRate: { value: 7.4, count: 0 }
  },
  {
    id: "10",
    name: "Monthly Product Highlights",
    type: "Email marketing",
    status: "Sent",
    lastUpdated: "15-07-2023",
    openRate: { value: 16.6, count: 0 },
    subscribedRate: { value: 5.7, count: 0 },
    activeRate: { value: 0.4, count: 0 }
  }
];

export interface UseMarketingCampaignsDataProps {
  statusFilter: string | null;
  searchQuery: string;
  sortDirection: "asc" | "desc";
  sortBy: string;
}

export const useMarketingCampaignsData = ({ 
  statusFilter, 
  searchQuery, 
  sortDirection,
  sortBy 
}: UseMarketingCampaignsDataProps) => {
  
  // Filter campaigns based on status and search
  const filteredCampaigns = useMemo(() => {
    return marketingCampaignsData.filter((campaign) => {
      const matchesSearch = searchQuery === "" || 
        campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campaign.type.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatusFilter = !statusFilter || 
        (statusFilter === 'Sent' && campaign.status === 'Sent') ||
        (statusFilter === 'Draft' && campaign.status === 'Draft');

      return matchesSearch && matchesStatusFilter;
    });
  }, [marketingCampaignsData, searchQuery, statusFilter]);

  // Sort campaigns based on sortBy field and direction
  const sortedCampaigns = useMemo(() => {
    return [...filteredCampaigns].sort((a, b) => {
      let valueA, valueB;
      
      // Determine which field to sort by
      switch(sortBy) {
        case 'lastUpdated':
          // Convert dates for proper comparison (DD-MM-YYYY format)
          valueA = new Date(a.lastUpdated.split('-').reverse().join('-')).getTime();
          valueB = new Date(b.lastUpdated.split('-').reverse().join('-')).getTime();
          break;
        case 'openRate':
          valueA = a.openRate.value;
          valueB = b.openRate.value;
          break;
        case 'subscribedRate':
          valueA = a.subscribedRate.value;
          valueB = b.subscribedRate.value;
          break;
        case 'activeRate':
          valueA = a.activeRate.value;
          valueB = b.activeRate.value;
          break;
        default:
          // Default to sort by name
          valueA = a.name;
          valueB = b.name;
      }
      
      // Apply sort direction
      if (sortDirection === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
  }, [filteredCampaigns, sortBy, sortDirection]);

  return {
    campaigns: marketingCampaignsData,
    filteredCampaigns: sortedCampaigns,
    isLoading: false
  };
};
