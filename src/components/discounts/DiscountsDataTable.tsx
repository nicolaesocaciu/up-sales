
import { Table, TableBody } from "@/components/ui/table";
import { useState } from "react";
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
  statusFilter: string | null;
}

export const DiscountsDataTable = ({ statusFilter }: DiscountsDataTableProps) => {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>(defaultColumnVisibility);

  // Use custom hooks to manage data, pagination, and selection
  const { filteredDiscounts, isLoading } = useDiscountsData({ 
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

  return (
    <div className="bg-white rounded-xl px-6">
      <div className="py-6 flex items-center justify-between gap-2">
        <DiscountsTableSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <DiscountsTableColumns
          columnVisibility={columnVisibility}
          onColumnVisibilityChange={setColumnVisibility}
        />
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
