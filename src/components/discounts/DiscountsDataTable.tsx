
import { Table, TableBody } from "@/components/ui/table";
import { useState } from "react";
import { DiscountStatus } from "@/types/discount";
import { DiscountsTableHeader } from "./DiscountsTableHeader";
import { DiscountsTableRow } from "./DiscountsTableRow";
import { DiscountsTablePagination } from "./DiscountsTablePagination";
import { DiscountsTableColumns, ColumnVisibility } from "./DiscountsTableColumns";
import { DiscountsTableSearch } from "./DiscountsTableSearch";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { useDiscountsData } from "@/hooks/useDiscountsData";
import { useDiscountsPagination } from "@/hooks/useDiscountsPagination";
import { useDiscountsSelection } from "@/hooks/useDiscountsSelection";
import { highlightText } from "@/utils/textHighlighter";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const defaultColumnVisibility: ColumnVisibility = {
  title: true,
  method: true,
  type: true,
  status: true,
  combinations: true,
  used: true,
  actions: true,
};

interface DiscountsDataTableProps {
  statusFilter: DiscountStatus | null;
}

export const DiscountsDataTable = ({ statusFilter: initialStatusFilter }: DiscountsDataTableProps) => {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<DiscountStatus | null>(initialStatusFilter);
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>(defaultColumnVisibility);
  const [filterOpen, setFilterOpen] = useState(false);

  // Use custom hooks to manage data, pagination, and selection
  const { filteredDiscounts, isLoading, statusCounts } = useDiscountsData({ 
    statusFilter, 
    searchQuery, 
    sortDirection 
  });

  const { 
    currentPage, 
    setCurrentPage, 
    discountsPerPage, 
    paginatedDiscounts, 
    handleDiscountsPerPageChange 
  } = useDiscountsPagination({ filteredDiscounts });

  const { 
    selectedRows, 
    handleSelectAll, 
    handleRowSelect 
  } = useDiscountsSelection({ paginatedDiscounts });

  const handleFilterChange = (value: DiscountStatus | null) => {
    setStatusFilter(value);
    setFilterOpen(false);
  };

  return (
    <div className="bg-white rounded-xl px-6">
      <div className="py-6 flex items-center justify-between gap-2">
        <DiscountsTableSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <div className="flex items-center gap-2 h-[30px]">
          <Popover open={filterOpen} onOpenChange={setFilterOpen}>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-9 rounded-lg border-[#8A8A8A] bg-white"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
                {statusFilter && (
                  <span className="ml-2 rounded-full bg-primary w-5 h-5 flex items-center justify-center text-white text-xs">
                    1
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60 bg-white p-4" align="end">
              <div className="space-y-4">
                <h4 className="font-medium">Filter by Status</h4>
                <RadioGroup 
                  value={statusFilter || "all"} 
                  onValueChange={(value) => handleFilterChange(value === "all" ? null : value as DiscountStatus)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all" />
                    <Label htmlFor="all">All Discounts</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Active" id="active" />
                    <Label htmlFor="active">Active ({statusCounts.Active})</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Expired" id="expired" />
                    <Label htmlFor="expired">Expired ({statusCounts.Expired})</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Pending" id="pending" />
                    <Label htmlFor="pending">Pending ({statusCounts.Pending})</Label>
                  </div>
                </RadioGroup>
              </div>
            </PopoverContent>
          </Popover>
          <DiscountsTableColumns
            columnVisibility={columnVisibility}
            onColumnVisibilityChange={setColumnVisibility}
          />
        </div>
      </div>

      <Table>
        <DiscountsTableHeader
          sortDirection={sortDirection}
          onSortChange={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}
          columnVisibility={columnVisibility}
          selectedRows={selectedRows}
          onSelectAll={handleSelectAll}
          totalRows={paginatedDiscounts.length}
        />
        <TableBody>
          {isLoading ? (
            <TableSkeleton columnCount={Object.keys(columnVisibility).length} rowCount={discountsPerPage} />
          ) : (
            paginatedDiscounts.map((discount) => (
              <DiscountsTableRow
                key={discount.id}
                discount={discount}
                columnVisibility={columnVisibility}
                selected={selectedRows.includes(discount.id)}
                onSelect={handleRowSelect}
                highlightText={(text) => highlightText(text, searchQuery)}
              />
            ))
          )}
        </TableBody>
      </Table>

      <DiscountsTablePagination
        totalDiscounts={filteredDiscounts.length}
        currentPageSize={paginatedDiscounts.length}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        discountsPerPage={discountsPerPage}
        onDiscountsPerPageChange={handleDiscountsPerPageChange}
      />
    </div>
  );
};
