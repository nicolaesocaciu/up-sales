
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { Check, CircleDot, AlertOctagon } from "lucide-react";
import { OrderStatus } from "@/types/order";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

const getStatusIcon = (status: OrderStatus) => {
  switch (status) {
    case "Paid":
      return <Check className="w-4 h-4 mr-1" />;
    case "Processing":
      return <CircleDot className="w-4 h-4 mr-1" />;
    case "Waiting":
      return <AlertOctagon className="w-4 h-4 mr-1" />;
  }
};

export const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  return (
    <Badge
      className={cn(
        "rounded-[4px] inline-flex items-center",
        status === "Paid" && "border-[#9BC29B] bg-[#CFE7CF] text-[#2D7048]",
        status === "Processing" && "border-[#99CBEC] bg-[#E7F2F9] text-[#0D5788]",
        status === "Waiting" && "border-[#F2C480] bg-[#FCF2DC] text-[#B35300]"
      )}
    >
      {getStatusIcon(status)}
      {status}
    </Badge>
  );
};
