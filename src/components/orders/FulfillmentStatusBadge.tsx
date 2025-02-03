import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Check, CircleDot, AlertOctagon } from "lucide-react";
import { FulfillmentStatus } from "@/types/order";

interface FulfillmentStatusBadgeProps {
  status: FulfillmentStatus;
}

const getStatusIcon = (status: FulfillmentStatus) => {
  switch (status) {
    case "Fulfilled":
      return <Check className="w-4 h-4 mr-1" />;
    case "Open":
      return <CircleDot className="w-4 h-4 mr-1" />;
    case "Unpaid":
    case "Closed":
      return <AlertOctagon className="w-4 h-4 mr-1" />;
  }
};

export const FulfillmentStatusBadge = ({ status }: FulfillmentStatusBadgeProps) => {
  return (
    <Badge
      variant="secondary"
      className={cn(
        "bg-opacity-10 inline-flex items-center",
        status === "Fulfilled" && "bg-status-paid text-status-paid",
        status === "Open" && "bg-status-processing text-status-processing",
        status === "Unpaid" && "bg-status-waiting text-status-waiting",
        status === "Closed" && "bg-gray-500 text-gray-500"
      )}
    >
      {getStatusIcon(status)}
      {status}
    </Badge>
  );
};