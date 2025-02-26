
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
        <Button variant="outline" className="my-0 py-0 mx-0 px-[16px] h-[30px] rounded-lg border-[#8A8A8A] bg-white text-text-dark flex items-center gap-1">
          <Filter className="h-4 w-4" />
          Add filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[200px] bg-white z-[9999] shadow-lg">
        <div className="bg-white p-2">
          <DropdownMenuLabel>Status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={selectedStatus === "Paid"}
            onCheckedChange={() => onStatusFilterChange(selectedStatus === "Paid" ? null : "Paid")}
            className="bg-white"
          >
            Paid
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={selectedStatus === "Processing"}
            onCheckedChange={() => onStatusFilterChange(selectedStatus === "Processing" ? null : "Processing")}
            className="bg-white"
          >
            Processing
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={selectedStatus === "Waiting"}
            onCheckedChange={() => onStatusFilterChange(selectedStatus === "Waiting" ? null : "Waiting")}
            className="bg-white"
          >
            Waiting
          </DropdownMenuCheckboxItem>
          
          <DropdownMenuLabel className="mt-2">Fulfillment Status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={selectedFulfillmentStatus === "Fulfilled"}
            onCheckedChange={() => onFulfillmentStatusFilterChange(selectedFulfillmentStatus === "Fulfilled" ? null : "Fulfilled")}
            className="bg-white"
          >
            Fulfilled
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={selectedFulfillmentStatus === "Unfulfilled"}
            onCheckedChange={() => onFulfillmentStatusFilterChange(selectedFulfillmentStatus === "Unfulfilled" ? null : "Unfulfilled")}
            className="bg-white"
          >
            Unfulfilled
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={selectedFulfillmentStatus === "Open"}
            onCheckedChange={() => onFulfillmentStatusFilterChange(selectedFulfillmentStatus === "Open" ? null : "Open")}
            className="bg-white"
          >
            Open
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={selectedFulfillmentStatus === "Closed"}
            onCheckedChange={() => onFulfillmentStatusFilterChange(selectedFulfillmentStatus === "Closed" ? null : "Closed")}
            className="bg-white"
          >
            Closed
          </DropdownMenuCheckboxItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
