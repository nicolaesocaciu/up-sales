import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
export const OrderTableHeader = () => {
  const navigate = useNavigate();
  return <div className="flex items-center justify-between px-6 py-6">
      <h2 className="text-lg font-semibold">Latest orders</h2>
      <Button variant="outline" onClick={() => navigate('/orders')} className="my-0 py-0 mx-0 h-[30px] rounded-lg border-[#8A8A8A] bg-white text-text-dark flex items-center gap-1 px-[16px]">
        View all
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>;
};