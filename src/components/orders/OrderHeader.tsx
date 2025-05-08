
import { Button } from "@/components/ui/button";
import { Edit, ChevronDown } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem 
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

interface OrderHeaderProps {
  orderId: string;
  orderDate: string;
}

export const OrderHeader = ({ orderId, orderDate }: OrderHeaderProps) => {
  // Ensure the # is displayed with the order ID
  const displayId = orderId.startsWith('#') ? orderId : `#${orderId}`;
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-2xl font-bold">Order {displayId}</h2>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            className="h-8 flex items-center gap-2 border border-[#8A8A8A] bg-white rounded-[8px] shadow-[0px_2px_4px_0px_rgba(37,38,38,0.08)]"
          >
            Refund
          </Button>
          <Button 
            variant="outline" 
            className="h-8 flex items-center gap-2 border border-[#8A8A8A] bg-white rounded-[8px] shadow-[0px_2px_4px_0px_rgba(37,38,38,0.08)]"
          >
            Edit
          </Button>
          <DropdownMenu open={isMoreOpen} onOpenChange={setIsMoreOpen}>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="h-8 flex items-center justify-between gap-2 border border-[#8A8A8A] bg-white rounded-[8px] shadow-[0px_2px_4px_0px_rgba(37,38,38,0.08)] px-4"
              >
                More actions
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px] p-2 rounded-xl bg-white">
              <DropdownMenuItem 
                className="flex items-center gap-2 px-4 py-3 text-sm cursor-pointer hover:bg-[#E7F2F9] rounded-lg"
              >
                Print order
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="flex items-center gap-2 px-4 py-3 text-sm cursor-pointer hover:bg-[#E7F2F9] rounded-lg"
              >
                Download invoice
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="flex items-center gap-2 px-4 py-3 text-sm cursor-pointer hover:bg-[#E7F2F9] rounded-lg text-red-600 hover:text-red-600"
              >
                Cancel order
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <p className="text-[#494A4A]">{orderDate}</p>
    </div>
  );
};
