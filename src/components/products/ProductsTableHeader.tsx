
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnVisibility } from "./ProductsTableColumns";

interface ProductsTableHeaderProps {
  sortDirection: "asc" | "desc";
  onSortChange: () => void;
  columnVisibility: ColumnVisibility;
  selectedRows: string[];
  onSelectAll: (checked: boolean) => void;
  totalRows: number;
}

export const ProductsTableHeader = ({ 
  sortDirection, 
  onSortChange,
  columnVisibility,
  selectedRows,
  onSelectAll,
  totalRows
}: ProductsTableHeaderProps) => {
  const allSelected = totalRows > 0 && selectedRows.length === totalRows;
  
  return (
    <TableHeader className="bg-muted/50">
      <TableRow className="hover:bg-transparent border-b hover:bg-transparent">
        <TableHead className="w-[40px]">
          <Checkbox 
            checked={allSelected} 
            onCheckedChange={onSelectAll}
            className="rounded-[4px]" 
          />
        </TableHead>
        {columnVisibility.name && <TableHead>Name</TableHead>}
        <TableHead className="text-right">In stock</TableHead>
        {columnVisibility.stockPrediction && (
          <TableHead>Stock prediction</TableHead>
        )}
        {columnVisibility.price && (
          <TableHead className="text-right">Price</TableHead>
        )}
        {columnVisibility.orders && (
          <TableHead>Orders</TableHead>
        )}
        {columnVisibility.sales && (
          <TableHead 
            className="text-right cursor-pointer hover:bg-muted"
            onClick={onSortChange}
          >
            <div className="flex items-center justify-end gap-2">
              Sales
              {sortDirection === "asc" ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </div>
          </TableHead>
        )}
        {columnVisibility.actions && (
          <TableHead className="text-center w-[70px]">Actions</TableHead>
        )}
      </TableRow>
    </TableHeader>
  );
};
