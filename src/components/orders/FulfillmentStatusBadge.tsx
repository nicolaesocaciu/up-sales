
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
        status === "Fulfilled" && "bg-[#22C55E] text-[#22C55E]",
        status === "Open" && "bg-blue-ocean text-blue-ocean",
        status === "Unfulfilled" && "bg-red-DEFAULT text-red-DEFAULT",
        status === "Unpaid" && "bg-orange-bright text-orange-bright",
        status === "Closed" && "bg-gray-medium text-gray-medium"
      )}
    >
      {status}
    </Badge>
  );
};
