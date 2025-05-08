import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetFooter } from "@/components/ui/sheet";
import { Order } from "@/types/order";
import { ChevronDown } from "lucide-react";
import { Badge } from "../ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface OrderItem {
  name: string;
  sku: string;
  price: string;
  quantity: number;
  total: string;
  image?: string;
}

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
  
  // Get products data from the database for this order
  const { data: productData } = useQuery({
    queryKey: ['orderProducts', order.id],
    queryFn: async () => {
      if (!order.products || order.products.length === 0) {
        return [];
      }
      
      // Extract product names/titles
      const productTitles = order.products.map(p => p.title);
      
      // Fetch matching products from database
      const { data } = await supabase
        .from('products')
        .select('*')
        .in('name', productTitles);
        
      return data || [];
    },
    enabled: open && !!order.products && order.products.length > 0
  });

  // Map order products to order items with quantity and price info
  const items: OrderItem[] = order.products?.map((product, index) => {
    // Look for matching product in database results
    const matchedProduct = productData?.find(p => p.name === product.title);
    
    // Ensure we have proper price values with default fallbacks
    const price = matchedProduct?.price || "$0.00";
    const quantity = 1; // Default quantity
    
    // Calculate total based on price and quantity
    // First, clean the price string to extract just the number
    const numericPrice = parseFloat(price.replace(/[^0-9.-]+/g, "")) || 0;
    const totalValue = numericPrice * quantity;
    
    // Format the total as currency
    const total = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(totalValue);
    
    return {
      name: product.title,
      sku: matchedProduct?.id || `SKU-${index}`,
      price: price,
      quantity: quantity,
      total: total,
      image: product.images?.[0] || order.thumbnail || "/lovable-uploads/6ec4fac8-f096-4716-b534-ea9b39c16b97.png"
    };
  }) || [];

  // If no items are defined yet (waiting for query), show placeholder items based on order info
  const displayItems = items.length > 0 ? items : [{
    name: order.items,
    sku: "SKU-0",
    price: order.value,
    quantity: order.itemCount || 1,
    total: order.value,
    image: order.thumbnail || "/lovable-uploads/6ec4fac8-f096-4716-b534-ea9b39c16b97.png"
  }];
  
  // Calculate total from items
  const subtotal = displayItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.-]+/g, "")) || 0;
    return sum + (price * item.quantity);
  }, 0);
  
  const shippingCost = 16;
  const total = subtotal + shippingCost;

  // Format the order date to match the design
  const formattedDate = new Date(order.date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }) + " at " + new Date(order.date).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
  
  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Keep the # in the order ID (don't remove it)
  const displayId = order.id;
  
  return <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[760px] max-w-full p-12 overflow-y-auto rounded-tl-[24px] rounded-bl-[24px]">
        <div className="flex flex-col h-full">
          {/* Header section */}
          <div className="pb-4">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-bold">{displayId}</h1>
              <div className="flex gap-2">
                <Button variant="outline" className="h-8 rounded-[8px] border-[1px] border-[#8A8A8A] bg-[#FFFFFF] shadow-[0px_2px_4px_0px_rgba(37,38,38,0.08)]">
                  Refund
                </Button>
                <Button variant="outline" className="h-8 rounded-[8px] border-[1px] border-[#8A8A8A] bg-[#FFFFFF] shadow-[0px_2px_4px_0px_rgba(37,38,38,0.08)]">
                  Edit
                </Button>
                <Button variant="outline" className="h-8 rounded-[8px] border-[1px] border-[#8A8A8A] bg-[#FFFFFF] shadow-[0px_2px_4px_0px_rgba(37,38,38,0.08)]">
                  More actions
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
            <p className="text-[#494A4A]">{formattedDate} from Online Store</p>
          </div>

          {/* Order Summary */}
          <div className="bg-[#F2F2F2] p-6 rounded-[16px]">
            {/* Order Status */}
            <div className="mb-6">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-lg">
                  {order.status === 'Paid' ? 'Payment completed' : 
                   order.status === 'Processing' ? 'Processing payment' : 
                   'Waiting for payment'}
                </h2>
                <Badge variant="outline" className={`
                  ${order.status === 'Paid' ? 'bg-green-100 text-green-800 border-green-200' : 
                    order.status === 'Processing' ? 'bg-blue-100 text-blue-800 border-blue-200' : 
                    'bg-amber-100 text-amber-800 border-amber-200'} 
                  font-medium`}
                >
                  {order.status}
                </Badge>
              </div>
            </div>

            {/* Order Details */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[#252626]">Subtotal</span>
                <div className="flex items-center">
                  <span className="text-[#252626] mr-1">🎧</span>
                  <span className="text-[#252626] mr-2">{displayItems.length} {displayItems.length === 1 ? 'item' : 'items'}</span>
                  <span className="font-medium">{formatCurrency(subtotal)}</span>
                </div>
              </div>

              <div className="flex justify-between">
                <span className="text-[#252626]">Shipping</span>
                <div className="flex justify-end">
                  <span className="text-[#252626] mr-2">Standard</span>
                  <span className="font-medium">{formatCurrency(shippingCost)}</span>
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-lg">{formatCurrency(total)}</span>
              </div>
            </div>

            <p className="text-[#494A4A] text-sm mt-4">
              Duties and import taxes may be charged on delivery.
              <a href="#" className="ml-1" style={{
              color: "#116fae"
            }}>Learn more</a>
            </p>
          </div>

          {/* Items section */}
          <div className="py-6">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="font-bold text-lg">Items</h2>
              <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200 font-medium">
                {order.fulfillmentStatus}
              </Badge>
            </div>

            <div className="space-y-6 divide-y divide-[#DADADA]">
              {displayItems.map((item, index) => (
                <div key={index} className={`${index > 0 ? 'pt-6' : ''}`}>
                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded">
                      {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-contain" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium" style={{
                    color: "#116fae"
                  }}>{item.name}</h3>
                      <p className="text-[#494A4A]">SKU: {item.sku}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{item.total}</p>
                      <p className="text-[#494A4A]">{item.price} × {item.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer section */}
          <div className="py-6 border-t border-[#DADADA]">
            <h2 className="font-bold text-lg mb-4">Customer</h2>
            <div className="space-y-1">
              <p className="font-medium">{order.customer.name}</p>
              <p style={{
              color: "#116fae"
            }}>{order.customer.email}</p>
            </div>
          </div>

          {/* Shipping address section */}
          <div className="py-6 border-t border-[#DADADA]">
            <h2 className="font-bold text-lg mb-4">Shipping address</h2>
            <div className="space-y-1">
              <p>Karenslyst allé 56</p>
              <p>0277, Oslo</p>
              <p>Norway</p>
              <p>+4 936 796 702</p>
            </div>
          </div>

          {/* Footer buttons */}
          <div className="mt-auto border-t border-[#DADADA] p-4">
            <SheetFooter>
              <SheetClose asChild>
                <Button variant="outline" className="rounded-[8px] border-[1px] border-[#8A8A8A] bg-[#FFFFFF] shadow-[0px_2px_4px_0px_rgba(37,38,38,0.08)] flex-1">
                  Close
                </Button>
              </SheetClose>
              <Button className="rounded-[8px] border-[1px] border-[#2D7048] bg-[#2D7048] shadow-[0px_2px_4px_0px_rgba(78,156,84,0.20)] flex-1">
                Fulfill order
              </Button>
            </SheetFooter>
          </div>
        </div>
      </SheetContent>
    </Sheet>;
}
