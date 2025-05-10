
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
        "rounded-[4px] py-[4px] px-[12px]",
        status === "Paid" && "border-[#9BC29B] bg-[#CFE7CF] text-[#2D7048]",
        status === "Processing" && "border-[#99CBEC] bg-[#E7F2F9] text-[#0D5788]",
        status === "Waiting" && "border-[#F2C480] bg-[#FCF2DC] text-[#B35300]"
      )}
    >
      {status}
    </Badge>
  );
};
