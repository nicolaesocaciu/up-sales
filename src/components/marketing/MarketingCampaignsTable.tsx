
import { Table, TableBody } from "@/components/ui/table";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { highlightText } from "@/utils/textHighlighter";
import { MarketingCampaignsTableHeader } from "./MarketingCampaignsTableHeader";
import { MarketingCampaignsTableRow } from "./MarketingCampaignsTableRow";
import { MarketingCampaignsTablePagination } from "./MarketingCampaignsTablePagination";
import { MarketingCampaignsTableColumns, ColumnVisibility } from "./MarketingCampaignsTableColumns";
import { MarketingCampaignsTableSearch } from "./MarketingCampaignsTableSearch";
import { useMarketingCampaignsData } from "@/hooks/useMarketingCampaignsData";
import { useMarketingCampaignsPagination } from "@/hooks/useMarketingCampaignsPagination";
import { useMarketingCampaignsSelection } from "@/hooks/useMarketingCampaignsSelection";

const defaultColumnVisibility: ColumnVisibility = {
  name: true,
  type: true,
  status: true,
  lastUpdated: true,
  openRate: true,
  subscribedRate: true,
  activeRate: true,
  actions: true,
};

export const MarketingCampaignsTable = () => {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [sortBy, setSortBy] = useState<string>("lastUpdated");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>(defaultColumnVisibility);
  const [showAddDialog, setShowAddDialog] = useState(false);

  // Use custom hooks to manage data, pagination, and selection
  const { filteredCampaigns, isLoading } = useMarketingCampaignsData({ 
    statusFilter, 
    searchQuery, 
    sortDirection,
    sortBy
  });

  const { 
    currentPage, 
    setCurrentPage, 
    campaignsPerPage, 
    paginatedCampaigns, 
    handleCampaignsPerPageChange 
  } = useMarketingCampaignsPagination({ filteredCampaigns });

  const { 
    selectedRows, 
    handleSelectAll, 
    handleRowSelect 
  } = useMarketingCampaignsSelection({ paginatedCampaigns });

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("desc");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Tabs value={statusFilter || "all"} onValueChange={(value) => setStatusFilter(value === "all" ? null : value)} className="w-full">
          <TabsList className="bg-transparent border-b border-gray-200 w-full justify-start h-auto p-0 space-x-6">
            <TabsTrigger 
              value="all"
              className="px-0 py-3 h-auto data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-[#116fae] data-[state=active]:border-b-2 data-[state=active]:border-[#116fae] rounded-none"
            >
              All campaigns
            </TabsTrigger>
            <TabsTrigger 
              value="Sent"
              className="px-0 py-3 h-auto data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-[#116fae] data-[state=active]:border-b-2 data-[state=active]:border-[#116fae] rounded-none"
            >
              Sent
            </TabsTrigger>
            <TabsTrigger 
              value="Draft"
              className="px-0 py-3 h-auto data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-[#116fae] data-[state=active]:border-b-2 data-[state=active]:border-[#116fae] rounded-none"
            >
              Draft
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Button 
          onClick={() => setShowAddDialog(true)} 
          className="flex items-center gap-2 border border-[#0D5788] bg-[#0D5788] text-white shadow-[0px_2px_4px_0px_rgba(13,87,136,0.16)] hover:border-[#124D77] hover:bg-[#124D77] active:border-[#1B384C] active:bg-[#1B384C] rounded-[8px]"
        >
          <Plus className="h-4 w-4" />
          New campaign
        </Button>
      </div>

      <div className="bg-white rounded-xl px-6">
        <div className="py-6 flex items-center justify-between gap-2">
          <MarketingCampaignsTableSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />
          <MarketingCampaignsTableColumns
            columnVisibility={columnVisibility}
            onColumnVisibilityChange={setColumnVisibility}
          />
        </div>

        <Table>
          <MarketingCampaignsTableHeader
            sortDirection={sortDirection}
            sortBy={sortBy}
            onSortChange={handleSort}
            columnVisibility={columnVisibility}
            selectedRows={selectedRows}
            onSelectAll={handleSelectAll}
            totalRows={paginatedCampaigns.length}
          />
          <TableBody>
            {isLoading ? (
              <TableSkeleton columnCount={Object.keys(columnVisibility).length} rowCount={campaignsPerPage} />
            ) : (
              paginatedCampaigns.map((campaign) => (
                <MarketingCampaignsTableRow
                  key={campaign.id}
                  campaign={campaign}
                  isSelected={selectedRows.includes(campaign.id)}
                  onSelect={() => handleRowSelect(campaign.id, !selectedRows.includes(campaign.id))}
                />
              ))
            )}
          </TableBody>
        </Table>

        <MarketingCampaignsTablePagination
          totalCampaigns={filteredCampaigns.length}
          currentPageSize={paginatedCampaigns.length}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          campaignsPerPage={campaignsPerPage}
          onCampaignsPerPageChange={handleCampaignsPerPageChange}
        />
      </div>
    </div>
  );
};
