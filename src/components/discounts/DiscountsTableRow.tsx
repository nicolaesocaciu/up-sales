import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnVisibility } from "./DiscountsTableColumns";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Discount } from "@/types/discount";
import { DiscountStatusBadge } from "./DiscountStatusBadge";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
interface DiscountsTableRowProps {
  discount: Discount;
  columnVisibility: ColumnVisibility;
  selected: boolean;
  onSelect: (id: string, checked: boolean) => void;
  highlightText: (text: string) => React.ReactNode;
}
export const DiscountsTableRow = ({
  discount,
  columnVisibility,
  selected,
  onSelect,
  highlightText
}: DiscountsTableRowProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return <TableRow className={cn("h-14 transition-colors", isDropdownOpen ? "bg-[#E7F2F9]" : "hover:bg-[#E7F2F9]")}>
      <TableCell className="w-[40px]">
        <Checkbox checked={selected} onCheckedChange={checked => onSelect(discount.id, checked === true)} className="rounded-[4px]" />
      </TableCell>

      {columnVisibility.title && <TableCell>
          <div className="flex flex-col">
            <span className="font-medium text-text-dark">{highlightText(discount.title)}</span>
            <span className="text-xs text-gray-500">{highlightText(discount.description)}</span>
          </div>
        </TableCell>}
      
      {columnVisibility.method && <TableCell>{discount.method}</TableCell>}

      {columnVisibility.type && <TableCell>
          <div className="flex flex-col">
            <span className="font-medium text-text-dark">{discount.type}</span>
            <span className="text-xs text-gray-500">{highlightText(discount.typeDescription)}</span>
          </div>
        </TableCell>}

      {columnVisibility.status && <TableCell>
          <DiscountStatusBadge status={discount.status} />
        </TableCell>}

      {columnVisibility.combinations && <TableCell>{highlightText(discount.combinations)}</TableCell>}

      {columnVisibility.used && <TableCell className="text-right">{discount.used}</TableCell>}

      {columnVisibility.actions && <TableCell className="w-[50px] text-center">
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className={cn("h-8 w-8 p-0 transition-colors", isDropdownOpen ? "bg-[rgba(153,203,236,0.50)]" : "hover:bg-[rgba(153,203,236,0.50)]")}>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px] p-2 rounded-xl bg-white" sideOffset={-10}>
              <DropdownMenuItem className="flex items-center gap-2 px-4 py-3 text-sm cursor-pointer hover:bg-[#E7F2F9] rounded-lg">
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 px-4 py-3 text-sm cursor-pointer hover:bg-[#E7F2F9] rounded-lg">
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 px-4 py-3 text-sm cursor-pointer hover:bg-[#E7F2F9] rounded-lg text-red-600 hover:text-red-600">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>}
    </TableRow>;
};