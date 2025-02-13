
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ProductTableSortHeaderProps {
  sortDirection: "asc" | "desc";
  onSortChange: () => void;
}

export const ProductTableSortHeader = ({ sortDirection, onSortChange }: ProductTableSortHeaderProps) => {
  return (
    <TableHeader className="bg-[#F2F2F2] rounded-[8px]">
      <TableRow className="h-12 hover:bg-transparent">
        <TableHead className="rounded-l-[8px]">Product</TableHead>
        <TableHead className="text-right">Price</TableHead>
        <TableHead>Total orders</TableHead>
        <TableHead 
          className="text-right cursor-pointer hover:bg-[#DADADA]"
          onClick={onSortChange}
        >
          <div className="flex items-center justify-end gap-2">
            Total sales
            {sortDirection === "asc" ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </div>
        </TableHead>
        <TableHead className="rounded-r-[8px] w-[50px] text-center">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};
