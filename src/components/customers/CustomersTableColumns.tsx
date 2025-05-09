
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Columns } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export interface ColumnVisibility {
  customerId: boolean;
  company: boolean;
  name: boolean;
  email: boolean;
  location: boolean;
  orders: boolean;
  amountSpent: boolean;
  subscriptionStatus: boolean;
  actions: boolean;
}

interface CustomersTableColumnsProps {
  columnVisibility: ColumnVisibility;
  onColumnVisibilityChange: (visibility: ColumnVisibility) => void;
}

export const CustomersTableColumns = ({
  columnVisibility,
  onColumnVisibilityChange,
}: CustomersTableColumnsProps) => {
  const handleColumnToggle = (column: keyof ColumnVisibility) => {
    onColumnVisibilityChange({
      ...columnVisibility,
      [column]: !columnVisibility[column],
    });
  };

  const displayNames: Record<keyof ColumnVisibility, string> = {
    customerId: "Customer ID",
    company: "Company",
    name: "Contact",
    email: "Email",
    location: "Location",
    orders: "Orders",
    amountSpent: "Amount Spent",
    subscriptionStatus: "Email Subscription",
    actions: "Actions"
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="px-[16px] h-[30px]">
          <Columns className="h-4 w-4" />
          Columns
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="bg-white z-50">
        <div className="p-2">
          <div className="space-y-2">
            {Object.entries(columnVisibility).map(([key, value]) => (
              <label
                key={key}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <Checkbox
                  checked={value}
                  onCheckedChange={() => handleColumnToggle(key as keyof ColumnVisibility)}
                />
                <span className="text-sm">{displayNames[key as keyof ColumnVisibility]}</span>
              </label>
            ))}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
