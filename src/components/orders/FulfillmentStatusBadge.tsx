
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { FulfillmentStatus } from "@/types/order";

interface FulfillmentStatusBadgeProps {
  status: FulfillmentStatus;
}

export const FulfillmentStatusBadge = ({ status }: FulfillmentStatusBadgeProps) => {
  return (
    <Badge
      className={cn(
        "rounded-[4px] px-3",
        status === "Fulfilled" && "bg-green-100 border-green-200 text-green-800 hover:bg-green-200",
        status === "Open" && "bg-blue-100 border-blue-200 text-blue-800 hover:bg-blue-200",
        status === "Unfulfilled" && "bg-red-100 border-red-200 text-red-800 hover:bg-red-200",
        status === "Unpaid" && "bg-yellow-100 border-yellow-200 text-yellow-800 hover:bg-yellow-200",
        status === "Closed" && "bg-gray-100 border-gray-200 text-gray-800 hover:bg-gray-200"
      )}
    >
      {status}
    </Badge>
  );
};
