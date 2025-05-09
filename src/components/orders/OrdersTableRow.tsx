
import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnVisibility } from "./OrdersTableColumns";
import { ReactNode, useState } from "react";
import { OrderStatusBadge } from "../dashboard/OrderStatusBadge";
import { FulfillmentStatusBadge } from "./FulfillmentStatusBadge";
import { Order } from "@/types/order";
import { OrderDetailsDrawer } from "./OrderDetailsDrawer";
import { useOrderDelete } from "./hooks/useOrderDelete";
import { OrderTableActions } from "./OrderTableActions";

interface OrdersTableRowProps {
  order: Order;
  columnVisibility: ColumnVisibility;
  highlightText: (text: string) => ReactNode;
  selected: boolean;
  onSelect: (orderId: string, checked: boolean) => void;
}

export const OrdersTableRow = ({
  order,
  columnVisibility,
  highlightText,
  selected,
  onSelect
}: OrdersTableRowProps) => {
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const { deleteOrder } = useOrderDelete();

  const handleOpenOrderDetails = () => {
    setShowOrderDetails(true);
  };

  const handleCloseOrderDetails = (open: boolean) => {
    setShowOrderDetails(open);
  };

  const handleDeleteOrder = () => {
    deleteOrder(order.id);
  };

  return (
    <>
      <TableRow key={order.id} className="h-16 hover:bg-gray-50">
        <TableCell>
          <Checkbox 
            checked={selected} 
            onCheckedChange={checked => onSelect(order.id, checked as boolean)} 
            className="rounded-[4px]" 
          />
        </TableCell>
        
        {columnVisibility.orderId && 
          <TableCell className="">
            <button
              className="text-[#116fae] hover:underline text-left"
              onClick={handleOpenOrderDetails}
            >
              {order.id}
            </button>
          </TableCell>
        }
        
        {columnVisibility.date && <TableCell>{order.date}</TableCell>}
        
        {columnVisibility.items && (
          <TableCell>
            <span 
              className="text-[#116fae] hover:underline cursor-pointer" 
              onClick={handleOpenOrderDetails}
            >
              {highlightText(order.items)}
            </span>
          </TableCell>
        )}
        
        {columnVisibility.customer && (
          <TableCell>
            <span className="text-[#116fae] hover:underline cursor-pointer">
              {highlightText(order.customer.name)}
            </span>
          </TableCell>
        )}
        
        {columnVisibility.email && <TableCell>{highlightText(order.customer.email)}</TableCell>}
        {columnVisibility.orderValue && <TableCell className="text-right">{order.value}</TableCell>}
        
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
          <TableCell className="text-center">
            <OrderTableActions 
              order={order} 
              onView={handleOpenOrderDetails} 
              onDelete={handleDeleteOrder} 
            />
          </TableCell>
        )}
      </TableRow>

      <OrderDetailsDrawer
        open={showOrderDetails}
        onOpenChange={handleCloseOrderDetails}
        order={order}
      />
    </>
  );
};
