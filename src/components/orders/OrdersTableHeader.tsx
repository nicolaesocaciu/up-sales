
import {
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnVisibility } from "./OrdersTableColumns";

interface OrdersTableHeaderProps {
  sortDirection: "asc" | "desc";
  onSortChange: () => void;
  columnVisibility: ColumnVisibility;
  selectedRows: string[];
  onSelectAll: (checked: boolean) => void;
  totalRows: number;
}

export const OrdersTableHeader = ({
  sortDirection,
  onSortChange,
  columnVisibility,
  selectedRows,
  onSelectAll,
  totalRows,
}: OrdersTableHeaderProps) => {
  const isIndeterminate = selectedRows.length > 0 && selectedRows.length < totalRows;
  const isSelected = selectedRows.length === totalRows && totalRows > 0;

  return (
    <TableHeader className="bg-[#F2F2F2] rounded-[8px]">
      <TableRow className="hover:bg-transparent border-none h-12">
        <TableHead className="rounded-l-[8px] w-[40px]">
          <Checkbox 
            checked={isSelected}
            className="rounded-[4px] data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground"
            onCheckedChange={onSelectAll}
            data-state={isIndeterminate ? "indeterminate" : isSelected ? "checked" : "unchecked"}
            aria-checked={isIndeterminate ? "mixed" : isSelected}
          />
        </TableHead>
        {columnVisibility.orderId && <TableHead>Order ID</TableHead>}
        {columnVisibility.date && (
          <TableHead 
            className="cursor-pointer"
            onClick={onSortChange}
          >
            <div className="flex items-center gap-2">
              Date
              <span className="text-gray-400">
                {sortDirection === "asc" ? "↑" : "↓"}
              </span>
            </div>
          </TableHead>
        )}
        {columnVisibility.items && <TableHead>Items</TableHead>}
        {columnVisibility.customer && <TableHead>Customer</TableHead>}
        {columnVisibility.email && <TableHead>Email</TableHead>}
        {columnVisibility.orderValue && <TableHead className="text-right">Order value</TableHead>}
        {columnVisibility.status && <TableHead>Status</TableHead>}
        {columnVisibility.fulfillmentStatus && <TableHead>Fulfillment status</TableHead>}
        {columnVisibility.actions && <TableHead className="rounded-r-[8px] w-[50px]">Actions</TableHead>}
      </TableRow>
    </TableHeader>
  );
};
