import { TableCell, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { OrderActionsDropdown } from "./OrderActionsDropdown";

type OrderStatus = "Paid" | "Processing" | "Waiting";

export interface Order {
  id: string;
  date: string;
  items: string;
  value: string;
  status: OrderStatus;
}

interface OrderRowProps {
  order: Order;
}

export const OrderRow = ({ order }: OrderRowProps) => {
  return (
    <TableRow className="h-12 hover:bg-[#E7F2F9] transition-colors">
      <TableCell className="font-medium">{order.id}</TableCell>
      <TableCell>{order.date}</TableCell>
      <TableCell>{order.items}</TableCell>
      <TableCell>{order.value}</TableCell>
      <TableCell>
        <Badge
          variant="secondary"
          className={cn(
            "bg-opacity-10",
            order.status === "Paid" && "bg-status-paid text-status-paid",
            order.status === "Processing" &&
              "bg-status-processing text-status-processing",
            order.status === "Waiting" &&
              "bg-status-waiting text-status-waiting"
          )}
        >
          {order.status}
        </Badge>
      </TableCell>
      <TableCell>
        <OrderActionsDropdown />
      </TableCell>
    </TableRow>
  );
};