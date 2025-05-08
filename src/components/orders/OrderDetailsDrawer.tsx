
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Order } from "@/types/order";
import { CustomerInfo } from "./CustomerInfo";
import { OrderFooter } from "./OrderFooter";
import { OrderHeader } from "./OrderHeader";
import { OrderItemsList } from "./OrderItemsList";
import { OrderSummary } from "./OrderSummary";
import { ShippingInfo } from "./ShippingInfo";
import { formatCurrency, useOrderData } from "./hooks/useOrderData";

interface OrderDetailsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order?: Order;
}

export function OrderDetailsDrawer({
  open,
  onOpenChange,
  order
}: OrderDetailsDrawerProps) {
  if (!order) return null;
  
  const { displayItems, subtotal, shippingCost, total, formattedDate } = useOrderData(order, open);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[760px] max-w-full p-12 overflow-y-auto rounded-tl-[24px] rounded-bl-[24px]">
        <div className="flex flex-col h-full">
          <OrderHeader orderId={order.id} orderDate={formattedDate} />
          <OrderSummary 
            status={order.status} 
            subtotal={subtotal} 
            itemCount={displayItems.length} 
            shippingCost={shippingCost} 
            total={total}
            formatCurrency={formatCurrency}
          />
          <OrderItemsList items={displayItems} fulfillmentStatus={order.fulfillmentStatus} />
          <CustomerInfo name={order.customer.name} email={order.customer.email} />
          <ShippingInfo />
          <OrderFooter />
        </div>
      </SheetContent>
    </Sheet>
  );
}
