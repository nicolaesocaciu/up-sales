import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
export const OrderTableHeader = () => {
  const navigate = useNavigate();
  return <div className="flex items-center justify-between px-6 py-6">
      <h2 className="text-lg font-bold text-text-dark">Latest orders!!!!!</h2>
      <Button variant="outline" onClick={() => navigate('/orders')} className="my-0 py-0 mx-0 h-[30px] px-[16px] flex items-center gap-1">
        View all
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>;
};