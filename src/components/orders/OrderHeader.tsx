
import { Button } from "@/components/ui/button";
import { Edit, MoreHorizontal, DollarSign } from "lucide-react";

interface OrderHeaderProps {
  orderId: string;
  orderDate: string;
}

export const OrderHeader = ({ orderId, orderDate }: OrderHeaderProps) => {
  // Ensure the # is displayed with the order ID
  const displayId = orderId.startsWith('#') ? orderId : `#${orderId}`;
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-2xl font-bold">Order {displayId}</h2>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-2 border border-[#8A8A8A] bg-white rounded-[8px] shadow-[0px_2px_4px_0px_rgba(37,38,38,0.08)]"
          >
            <DollarSign className="h-4 w-4" />
            Refund
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-2 border border-[#8A8A8A] bg-white rounded-[8px] shadow-[0px_2px_4px_0px_rgba(37,38,38,0.08)]"
          >
            <Edit className="h-4 w-4" />
            Edit
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-2 border border-[#8A8A8A] bg-white rounded-[8px] shadow-[0px_2px_4px_0px_rgba(37,38,38,0.08)]"
          >
            <MoreHorizontal className="h-4 w-4" />
            More options
          </Button>
        </div>
      </div>
      <p className="text-[#494A4A]">{orderDate}</p>
    </div>
  );
};
