import {
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

interface OrdersTableHeaderProps {
  sortDirection: "asc" | "desc";
  onSortChange: () => void;
}

export const OrdersTableHeader = ({
  sortDirection,
  onSortChange,
}: OrdersTableHeaderProps) => {
  return (
    <TableHeader>
      <TableRow className="hover:bg-transparent border-b border-gray-200">
        <TableHead className="w-[40px]">
          <Checkbox />
        </TableHead>
        <TableHead>Order ID</TableHead>
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
        <TableHead>Items</TableHead>
        <TableHead>Customer</TableHead>
        <TableHead>Email</TableHead>
        <TableHead className="text-right">Order value</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Fulfillment status</TableHead>
        <TableHead className="w-[50px]">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};