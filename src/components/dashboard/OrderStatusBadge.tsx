
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
      variant="secondary"
      className={cn(
        "bg-opacity-10 inline-flex items-center",
        status === "Paid" && "bg-status-paid text-status-paid",
        status === "Processing" && "bg-status-processing text-status-processing",
        status === "Waiting" && "bg-status-waiting text-status-waiting"
      )}
    >
      {getStatusIcon(status)}
      {status}
    </Badge>
  );
};
