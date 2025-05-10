
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
        "rounded-[4px] py-[3px] px-[12px] bg-white",
        status === "Fulfilled" && "border-[#CFE7CF] bg-white text-[#2D7048]",
        status === "Open" && "border-[#D2EAFA] bg-white text-[#0D5788]",
        status === "Unfulfilled" && "border-[#FAD9DE] bg-white text-[#CC334C]",
        status === "Unpaid" && "border-[#FCDFB1] bg-white text-[#B35300]",
        status === "Closed" && "border-[#DADADA] bg-white text-[#494A4A]"
      )}
    >
      {status}
    </Badge>
  );
};
