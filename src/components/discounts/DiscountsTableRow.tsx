
import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnVisibility } from "./DiscountsTableColumns";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Discount } from "@/types/discount";
import { DiscountStatusBadge } from "./DiscountStatusBadge";

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
  return (
    <TableRow className="h-14 hover:bg-slate-50">
      <TableCell className="w-[40px]">
        <Checkbox 
          checked={selected} 
          onCheckedChange={(checked) => onSelect(discount.id, checked === true)}
          className="rounded-[4px]" 
        />
      </TableCell>

      {columnVisibility.title && (
        <TableCell>
          <div className="flex flex-col">
            <span className="font-medium text-text-dark">{highlightText(discount.title)}</span>
            <span className="text-xs text-gray-500">{highlightText(discount.description)}</span>
          </div>
        </TableCell>
      )}
      
      {columnVisibility.method && (
        <TableCell>{discount.method}</TableCell>
      )}

      {columnVisibility.type && (
        <TableCell>
          <div className="flex flex-col">
            <span className="font-medium text-text-dark">{discount.type}</span>
            <span className="text-xs text-gray-500">{highlightText(discount.typeDescription)}</span>
          </div>
        </TableCell>
      )}

      {columnVisibility.status && (
        <TableCell>
          <DiscountStatusBadge status={discount.status} />
        </TableCell>
      )}

      {columnVisibility.combinations && (
        <TableCell>{highlightText(discount.combinations)}</TableCell>
      )}

      {columnVisibility.used && (
        <TableCell className="text-right">{discount.used}</TableCell>
      )}

      {columnVisibility.actions && (
        <TableCell className="w-[50px]">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      )}
    </TableRow>
  );
};
