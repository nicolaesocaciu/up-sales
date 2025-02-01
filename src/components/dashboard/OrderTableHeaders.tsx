import { TableHeader, TableRow, TableHead } from "../ui/table";
import { OrderTableSortableHeader } from "./OrderTableSortableHeader";

interface OrderTableHeadersProps {
  sortDirection: "asc" | "desc";
  onToggleSort: () => void;
}

export const OrderTableHeaders = ({
  sortDirection,
  onToggleSort,
}: OrderTableHeadersProps) => {
  return (
    <TableHeader className="bg-[#F2F2F2] rounded-[8px]">
      <TableRow className="h-12 hover:bg-transparent">
        <TableHead className="rounded-l-[8px]">Order ID</TableHead>
        <OrderTableSortableHeader 
          sortDirection={sortDirection}
          onToggleSort={onToggleSort}
        />
        <TableHead>Items</TableHead>
        <TableHead className="text-right">Order value</TableHead>
        <TableHead>Status</TableHead>
        <TableHead className="rounded-r-[8px] w-[50px]">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};