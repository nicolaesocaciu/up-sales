
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Order } from "@/types/order";
import { CustomerInfo } from "./CustomerInfo";
import { OrderFooter } from "./OrderFooter";
import { OrderHeader } from "./OrderHeader";
import { OrderItemsList } from "./OrderItemsList";
import { OrderSummary } from "./OrderSummary";
import { ShippingInfo } from "./ShippingInfo";
import { formatCurrency, useOrderData } from "./hooks/useOrderData";
import { useEffect } from "react";

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

  // Handle ESC key and interactions outside properly
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onOpenChange(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onOpenChange]);

  const handleCloseDrawer = () => {
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        className="w-[760px] max-w-full p-12 overflow-y-auto rounded-tl-[24px] rounded-bl-[24px]"
        onInteractOutside={handleCloseDrawer} // Close when clicking outside
        onEscapeKeyDown={handleCloseDrawer} // Explicitly handle ESC key
      >
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
