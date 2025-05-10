
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
        "rounded-[4px] py-[4px] px-[12px] bg-white",
        status === "Fulfilled" && "border-[#9BC29B] bg-[#CFE7CF] text-[#2D7048]",
        status === "Open" && "border-[#99CBEC] bg-[#E7F2F9] text-[#0D5788]",
        status === "Unfulfilled" && "border-[#F1BDC4] bg-[#FAD9DE] text-[#CC334C]",
        status === "Unpaid" && "border-[#F2C480] bg-[#FCF2DC] text-[#B35300]",
        status === "Closed" && "border-[#C0C0C0] bg-[#DADADA] text-[#494A4A]"
      )}
    >
      {status}
    </Badge>
  );
};
