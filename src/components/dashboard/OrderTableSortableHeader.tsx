import { TableHead } from "../ui/table";
import { ChevronDown, ChevronUp } from "lucide-react";

interface OrderTableSortableHeaderProps {
  sortDirection: "asc" | "desc";
  onToggleSort: () => void;
}

export const OrderTableSortableHeader = ({
  sortDirection,
  onToggleSort,
}: OrderTableSortableHeaderProps) => {
  return (
    <TableHead 
      className="cursor-pointer hover:bg-[#DADADA]"
      onClick={onToggleSort}
    >
      <div className="flex items-center gap-2">
        Date
        {sortDirection === "asc" ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </div>
    </TableHead>
  );
};