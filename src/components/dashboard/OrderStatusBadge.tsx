
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { OrderStatus } from "@/types/order";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  return (
    <Badge
      className={cn(
        "rounded-[4px] py-[3px] px-[12px]",
        status === "Paid" && "border-[#CFE7CF] bg-[#EBF7EB] text-[#2D7048]",
        status === "Processing" && "border-[#D2EAFA] bg-[#E7F2F9] text-[#0D5788]",
        status === "Waiting" && "border-[#FCDFB1] bg-[#FFF7E4] text-[#B35300]"
      )}
    >
      {status}
    </Badge>
  );
};
