import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreVertical } from "lucide-react";
import { OrderStatusBadge } from "../dashboard/OrderStatusBadge";
import { FulfillmentStatusBadge } from "./FulfillmentStatusBadge";
import { Order } from "@/types/order";

interface OrdersTableRowProps {
  order: Order;
}

export const OrdersTableRow = ({ order }: OrdersTableRowProps) => {
  return (
    <TableRow key={order.id} className="hover:bg-gray-50">
      <TableCell>
        <Checkbox />
      </TableCell>
      <TableCell className="font-medium">#{order.id}</TableCell>
      <TableCell>{order.date}</TableCell>
      <TableCell>
        <span className="text-primary hover:underline cursor-pointer">
          {order.items}
        </span>
      </TableCell>
      <TableCell>
        <span className="text-primary hover:underline cursor-pointer">
          {order.customer.name}
        </span>
      </TableCell>
      <TableCell>{order.customer.email}</TableCell>
      <TableCell className="text-right">{order.value}</TableCell>
      <TableCell>
        <OrderStatusBadge status={order.status} />
      </TableCell>
      <TableCell>
        <FulfillmentStatusBadge status={order.fulfillmentStatus} />
      </TableCell>
      <TableCell>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};