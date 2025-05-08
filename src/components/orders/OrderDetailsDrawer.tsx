
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetFooter } from "@/components/ui/sheet";
import { Order } from "@/types/order";
import { ChevronDown } from "lucide-react";
import { Badge } from "../ui/badge";

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

export function OrderDetailsDrawer({ open, onOpenChange, order }: OrderDetailsDrawerProps) {
  if (!order) return null;

  // Sample items data based on the screenshot
  const items: OrderItem[] = [
    {
      name: "Sony WH-1000XM5 Headphones",
      sku: "SN-10-white",
      price: "$1,000",
      quantity: 1,
      total: "$1,000",
      image: "/lovable-uploads/6ec4fac8-f096-4716-b534-ea9b39c16b97.png"
    },
    {
      name: "Keychron Q1 Mechanical Keyboard",
      sku: "SN-10-white",
      price: "$230",
      quantity: 1,
      total: "$230",
      image: "/lovable-uploads/6ec4fac8-f096-4716-b534-ea9b39c16b97.png"
    }
  ];

  // Format the order date to match the design
  const formattedDate = new Date().toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }) + " at " + new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[600px] max-w-full p-0 pt-0 overflow-y-auto">
        <div className="flex flex-col h-full">
          {/* Header section */}
          <div className="p-6 pb-4">
            <h1 className="text-2xl font-bold mb-1">#{order.id}</h1>
            <p className="text-gray-600">{formattedDate} from Online Store</p>

            <div className="flex gap-2 mt-6">
              <Button variant="outline" className="rounded-md">
                Refund
              </Button>
              <Button variant="outline" className="rounded-md">
                Edit
              </Button>
              <Button variant="outline" className="rounded-md ml-auto">
                More actions
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-100 p-6">
            {/* Order Status */}
            <div className="mb-6">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-lg">Processing payment</h2>
                <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200 font-medium">
                  Waiting
                </Badge>
              </div>
            </div>

            {/* Order Details */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <div className="flex items-center">
                  <span className="text-gray-800 mr-1">🎧</span>
                  <span className="text-gray-800 mr-2">2 items</span>
                  <span className="font-medium">$1,230</span>
                </div>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <div className="flex justify-end">
                  <span className="text-gray-800 mr-2">Standard</span>
                  <span className="font-medium">$16</span>
                </div>
              </div>

              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-lg">$1,256</span>
              </div>
            </div>

            <p className="text-gray-600 text-sm mt-4">
              Duties and import taxes may be charged on delivery.
              <a href="#" className="text-blue-600 ml-1">Learn more</a>
            </p>
          </div>

          {/* Items section */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="font-bold text-lg">Items</h2>
              <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200 font-medium">
                Unfulfilled
              </Badge>
            </div>

            <div className="space-y-6 divide-y divide-gray-100">
              {items.map((item, index) => (
                <div key={index} className={`${index > 0 ? 'pt-6' : ''}`}>
                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded">
                      {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-contain" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-blue-600">{item.name}</h3>
                      <p className="text-gray-600">SKU: {item.sku}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{item.total}</p>
                      <p className="text-gray-600">{item.price} × {item.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer section */}
          <div className="p-6 border-t border-gray-200">
            <h2 className="font-bold text-lg mb-4">Customer</h2>
            <div className="space-y-1">
              <p className="font-medium">Sophia Chen</p>
              <p className="text-blue-600">schen.marketing@agency.com</p>
            </div>
          </div>

          {/* Shipping address section */}
          <div className="p-6 border-t border-gray-200">
            <h2 className="font-bold text-lg mb-4">Shipping address</h2>
            <div className="space-y-1">
              <p>Karenslyst allé 56</p>
              <p>0277, Oslo</p>
              <p>Norway</p>
              <p>+4 936 796 702</p>
            </div>
          </div>

          {/* Footer buttons */}
          <div className="mt-auto border-t border-gray-200 p-4">
            <SheetFooter>
              <SheetClose asChild>
                <Button variant="outline" className="rounded-md flex-1">
                  Close
                </Button>
              </SheetClose>
              <Button className="bg-green-700 hover:bg-green-800 rounded-md flex-1">
                Fulfill order
              </Button>
            </SheetFooter>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
