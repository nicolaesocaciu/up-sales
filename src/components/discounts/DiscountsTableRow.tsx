
import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnVisibility } from "./DiscountsTableColumns";
import { ReactNode } from "react";
import { DiscountStatusBadge } from "./DiscountStatusBadge";
import { Discount } from "@/types/discount";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye, Pencil } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent,
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface DiscountsTableRowProps {
  discount: Discount;
  columnVisibility: ColumnVisibility;
  highlightText: (text: string) => ReactNode;
  selected: boolean;
  onSelect: (discountId: string, checked: boolean) => void;
}

export const DiscountsTableRow = ({
  discount,
  columnVisibility,
  highlightText,
  selected,
  onSelect
}: DiscountsTableRowProps) => {
  const handleViewDiscount = () => {
    console.log("View discount:", discount.id);
  };

  const handleEditDiscount = () => {
    console.log("Edit discount:", discount.id);
  };

  return (
    <TableRow key={discount.id} className="h-12 hover:bg-[#E7F2F9]">
      <TableCell>
        <Checkbox 
          checked={selected} 
          onCheckedChange={checked => onSelect(discount.id, checked as boolean)} 
          className="rounded-[4px]" 
        />
      </TableCell>
      
      {columnVisibility.title && 
        <TableCell>
          <div>
            <div className="text-[#116fae] hover:underline">
              {highlightText(discount.title)}
            </div>
            <div className="text-xs text-gray-500">
              {highlightText(discount.description)}
            </div>
          </div>
        </TableCell>
      }
      
      {columnVisibility.method && <TableCell>{discount.method}</TableCell>}
      
      {columnVisibility.type && 
        <TableCell>
          <div>
            <div>{discount.type}</div>
            <div className="text-xs text-gray-500">{discount.typeDescription}</div>
          </div>
        </TableCell>
      }
      
      {columnVisibility.status && (
        <TableCell>
          <DiscountStatusBadge status={discount.status} />
        </TableCell>
      )}
      
      {columnVisibility.combinations && <TableCell>{discount.combinations}</TableCell>}
      
      {columnVisibility.used && <TableCell className="text-right">{discount.used}</TableCell>}
      
      {columnVisibility.actions && (
        <TableCell className="text-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="transition-colors hover:bg-[rgba(153,203,236,0.50)]"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-[200px] p-2 rounded-xl bg-white"
              sideOffset={-10}
            >
              <DropdownMenuItem 
                className="flex items-center gap-2 px-4 py-3 text-sm cursor-pointer hover:bg-[#E7F2F9] rounded-lg"
                onClick={handleViewDiscount}
              >
                <Eye className="h-5 w-5" />
                View discount
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="flex items-center gap-2 px-4 py-3 text-sm cursor-pointer hover:bg-[#E7F2F9] rounded-lg"
                onClick={handleEditDiscount}
              >
                <Pencil className="h-5 w-5" />
                Edit discount
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      )}
    </TableRow>
  );
};
