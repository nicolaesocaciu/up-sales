import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Columns } from "lucide-react";

export interface ColumnVisibility {
  orderId: boolean;
  date: boolean;
  items: boolean;
  customer: boolean;
  email: boolean;
  orderValue: boolean;
  status: boolean;
  fulfillmentStatus: boolean;
  actions: boolean;
}

interface OrdersTableColumnsProps {
  columnVisibility: ColumnVisibility;
  onColumnVisibilityChange: (visibility: ColumnVisibility) => void;
}

export const OrdersTableColumns = ({
  columnVisibility,
  onColumnVisibilityChange,
}: OrdersTableColumnsProps) => {
  const toggleColumn = (column: keyof ColumnVisibility) => {
    onColumnVisibilityChange({
      ...columnVisibility,
      [column]: !columnVisibility[column],
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-9">
          <Columns className="h-4 w-4 mr-2" />
          Columns
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px] bg-white z-50">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={columnVisibility.orderId}
          onCheckedChange={() => toggleColumn("orderId")}
        >
          Order ID
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={columnVisibility.date}
          onCheckedChange={() => toggleColumn("date")}
        >
          Date
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={columnVisibility.items}
          onCheckedChange={() => toggleColumn("items")}
        >
          Items
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={columnVisibility.customer}
          onCheckedChange={() => toggleColumn("customer")}
        >
          Customer
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={columnVisibility.email}
          onCheckedChange={() => toggleColumn("email")}
        >
          Email
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={columnVisibility.orderValue}
          onCheckedChange={() => toggleColumn("orderValue")}
        >
          Order value
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={columnVisibility.status}
          onCheckedChange={() => toggleColumn("status")}
        >
          Status
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={columnVisibility.fulfillmentStatus}
          onCheckedChange={() => toggleColumn("fulfillmentStatus")}
        >
          Fulfillment status
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={columnVisibility.actions}
          onCheckedChange={() => toggleColumn("actions")}
        >
          Actions
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};