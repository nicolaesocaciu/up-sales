
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
        status === "Paid" && "bg-green-100 border-green-200 text-green-800 hover:bg-green-200",
        status === "Processing" && "bg-blue-100 border-blue-200 text-blue-800 hover:bg-blue-200",
        status === "Waiting" && "bg-yellow-100 border-yellow-200 text-yellow-800 hover:bg-yellow-200"
      )}
    >
      {getStatusIcon(status)}
      {status}
    </Badge>
  );
};
