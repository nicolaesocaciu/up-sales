import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { Check, CircleDot, AlertOctagon, Lock } from "lucide-react";
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
      return <AlertOctagon className="w-4 h-4 mr-1" />;
    case "Closed":
      return <Lock className="w-4 h-4 mr-1" />;
    case "Unfulfilled":
      return <AlertOctagon className="w-4 h-4 mr-1" />;
  }
};

const getStatusColor = (status: FulfillmentStatus) => {
  switch (status) {
    case "Fulfilled":
      return "bg-status-paid text-status-paid";
    case "Open":
      return "bg-status-processing text-status-processing";
    case "Unpaid":
      return "bg-status-waiting text-status-waiting";
    case "Closed":
      return "bg-gray-500 text-gray-500";
    case "Unfulfilled":
      return "bg-status-waiting text-status-waiting";
  }
};

export const FulfillmentStatusBadge = ({ status }: FulfillmentStatusBadgeProps) => {
  return (
    <Badge
      variant="secondary"
      className={cn(
        "bg-opacity-10 inline-flex items-center",
        getStatusColor(status)
      )}
    >
      {getStatusIcon(status)}
      {status}
    </Badge>
  );
};