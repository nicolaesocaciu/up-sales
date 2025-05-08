
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface OrderHeaderProps {
  orderId: string;
  orderDate: string;
}

export const OrderHeader = ({ orderId, orderDate }: OrderHeaderProps) => {
  return (
    <div className="pb-4">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold">{orderId}</h1>
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
      <p className="text-[#494A4A]">{orderDate} from Online Store</p>
    </div>
  );
};
