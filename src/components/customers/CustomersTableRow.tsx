
import { TableCell, TableRow } from "@/components/ui/table";
import { ColumnVisibility } from "./CustomersTableColumns";
import { Customer } from "@/types/customer";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { formatCurrency } from "@/lib/utils";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface CustomersTableRowProps {
  customer: Customer;
  columnVisibility: ColumnVisibility;
  selected: boolean;
  onSelect: (customerId: string, checked: boolean) => void;
  highlightText: (text: string) => ReactNode;
}

export const CustomersTableRow = ({
  customer,
  columnVisibility,
  selected,
  onSelect,
  highlightText,
}: CustomersTableRowProps) => {
  return (
    <TableRow className="h-16 hover:bg-[#E7F2F9]">
      <TableCell className="px-4">
        <Checkbox 
          checked={selected}
          onCheckedChange={(checked) => onSelect(customer.id, checked === true)}
          className="rounded-[4px]"
        />
      </TableCell>
      
      {columnVisibility.name && (
        <TableCell>
          <div className="flex items-center gap-3">
            <img
              src={customer.avatar}
              alt={customer.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span>{highlightText(customer.name)}</span>
          </div>
        </TableCell>
      )}
      
      {columnVisibility.email && (
        <TableCell>{highlightText(customer.email)}</TableCell>
      )}
      
      {columnVisibility.subscriptionStatus && (
        <TableCell>
          {customer.subscriptionStatus === "subscribed" && (
            <Badge variant="success" className="rounded-full px-3 bg-green-100 border-green-200 text-green-800 hover:bg-green-200">
              Subscribed
            </Badge>
          )}
          {customer.subscriptionStatus === "not_subscribed" && (
            <Badge variant="warning" className="rounded-full px-3 bg-red-100 border-red-200 text-red-800 hover:bg-red-200">
              Not subscribed
            </Badge>
          )}
          {customer.subscriptionStatus === "pending" && (
            <Badge variant="outline" className="rounded-full px-3 bg-yellow-100 border-yellow-200 text-yellow-800 hover:bg-yellow-200">
              Pending
            </Badge>
          )}
        </TableCell>
      )}
      
      {columnVisibility.location && (
        <TableCell>{highlightText(customer.location)}</TableCell>
      )}
      
      {columnVisibility.orders && (
        <TableCell>
          {customer.orders === "N/A" ? "N/A" : `${customer.orders} Orders`}
        </TableCell>
      )}
      
      {columnVisibility.amountSpent && (
        <TableCell className="text-right">{formatCurrency(customer.amountSpent)}</TableCell>
      )}
      
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
              <DropdownMenuItem className="flex items-center gap-2 px-4 py-3 text-sm cursor-pointer hover:bg-[#E7F2F9] rounded-lg">
                View details
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 px-4 py-3 text-sm cursor-pointer hover:bg-[#E7F2F9] rounded-lg">
                Edit customer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      )}
    </TableRow>
  );
};
