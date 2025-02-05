import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreVertical } from "lucide-react";
import { OrderStatusBadge } from "../dashboard/OrderStatusBadge";
import { FulfillmentStatusBadge } from "./FulfillmentStatusBadge";
import { Order } from "@/types/order";
import { ColumnVisibility } from "./OrdersTableColumns";
import { ReactNode } from "react";

interface OrdersTableRowProps {
  order: Order;
  columnVisibility: ColumnVisibility;
  highlightText: (text: string) => ReactNode;
}

export const OrdersTableRow = ({ order, columnVisibility, highlightText }: OrdersTableRowProps) => {
  return (
    <TableRow key={order.id} className="hover:bg-gray-50">
      <TableCell>
        <Checkbox />
      </TableCell>
      {columnVisibility.orderId && (
        <TableCell className="font-medium">{order.id}</TableCell>
      )}
      {columnVisibility.date && <TableCell>{order.date}</TableCell>}
      {columnVisibility.items && (
        <TableCell>
          <span className="text-primary hover:underline cursor-pointer">
            {highlightText(order.items)}
          </span>
        </TableCell>
      )}
      {columnVisibility.customer && (
        <TableCell>
          <span className="text-primary hover:underline cursor-pointer">
            {highlightText(order.customer.name)}
          </span>
        </TableCell>
      )}
      {columnVisibility.email && (
        <TableCell>{highlightText(order.customer.email)}</TableCell>
      )}
      {columnVisibility.orderValue && (
        <TableCell className="text-right">{order.value}</TableCell>
      )}
      {columnVisibility.status && (
        <TableCell>
          <OrderStatusBadge status={order.status} />
        </TableCell>
      )}
      {columnVisibility.fulfillmentStatus && (
        <TableCell>
          <FulfillmentStatusBadge status={order.fulfillmentStatus} />
        </TableCell>
      )}
      {columnVisibility.actions && (
        <TableCell>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </TableCell>
      )}
    </TableRow>
  );
};