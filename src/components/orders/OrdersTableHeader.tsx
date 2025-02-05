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
}

export const OrdersTableHeader = ({
  sortDirection,
  onSortChange,
  columnVisibility,
}: OrdersTableHeaderProps) => {
  return (
    <TableHeader>
      <TableRow className="hover:bg-transparent border-b border-gray-200">
        <TableHead className="w-[40px]">
          <Checkbox />
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
        {columnVisibility.actions && <TableHead className="w-[50px]">Actions</TableHead>}
      </TableRow>
    </TableHeader>
  );
};