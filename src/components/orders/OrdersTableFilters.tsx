
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";
import { OrderStatus, FulfillmentStatus } from "@/types/order";

interface OrdersTableFiltersProps {
  onStatusFilterChange: (status: OrderStatus | null) => void;
  onFulfillmentStatusFilterChange: (status: FulfillmentStatus | null) => void;
  selectedStatus: OrderStatus | null;
  selectedFulfillmentStatus: FulfillmentStatus | null;
}

export const OrdersTableFilters = ({
  onStatusFilterChange,
  onFulfillmentStatusFilterChange,
  selectedStatus,
  selectedFulfillmentStatus,
}: OrdersTableFiltersProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="my-0 py-0 mx-0 px-[22px] h-[30px] rounded-lg border-[#8A8A8A] bg-white text-text-dark flex items-center gap-1">
          <Filter className="h-4 w-4" />
          Add filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[200px] bg-white z-50">
        <DropdownMenuLabel>Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={selectedStatus === "Paid"}
          onCheckedChange={() => onStatusFilterChange(selectedStatus === "Paid" ? null : "Paid")}
        >
          Paid
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={selectedStatus === "Processing"}
          onCheckedChange={() => onStatusFilterChange(selectedStatus === "Processing" ? null : "Processing")}
        >
          Processing
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={selectedStatus === "Waiting"}
          onCheckedChange={() => onStatusFilterChange(selectedStatus === "Waiting" ? null : "Waiting")}
        >
          Waiting
        </DropdownMenuCheckboxItem>
        
        <DropdownMenuLabel className="mt-2">Fulfillment Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={selectedFulfillmentStatus === "Fulfilled"}
          onCheckedChange={() => onFulfillmentStatusFilterChange(selectedFulfillmentStatus === "Fulfilled" ? null : "Fulfilled")}
        >
          Fulfilled
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={selectedFulfillmentStatus === "Unfulfilled"}
          onCheckedChange={() => onFulfillmentStatusFilterChange(selectedFulfillmentStatus === "Unfulfilled" ? null : "Unfulfilled")}
        >
          Unfulfilled
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={selectedFulfillmentStatus === "Open"}
          onCheckedChange={() => onFulfillmentStatusFilterChange(selectedFulfillmentStatus === "Open" ? null : "Open")}
        >
          Open
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={selectedFulfillmentStatus === "Closed"}
          onCheckedChange={() => onFulfillmentStatusFilterChange(selectedFulfillmentStatus === "Closed" ? null : "Closed")}
        >
          Closed
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
