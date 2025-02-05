import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { FulfillmentStatus } from "@/types/order";

interface FulfillmentStatusBadgeProps {
  status: FulfillmentStatus;
}

export const FulfillmentStatusBadge = ({ status }: FulfillmentStatusBadgeProps) => {
  return (
    <Badge
      variant="secondary"
      className={cn(
        "bg-opacity-10 inline-flex items-center",
        status === "Fulfilled" && "bg-status-paid text-status-paid",
        status === "Open" && "bg-status-processing text-status-processing",
        status === "Unfulfilled" && "bg-[#ea384c] text-[#ea384c]",
        status === "Unpaid" && "bg-status-waiting text-status-waiting",
        status === "Closed" && "bg-gray-500 text-gray-500"
      )}
    >
      {status}
    </Badge>
  );
};