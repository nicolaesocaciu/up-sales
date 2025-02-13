import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
export const OrderTableHeader = () => {
  const navigate = useNavigate();
  return <div className="flex items-center justify-between px-6 py-6">
      <h2 className="text-lg font-semibold">Latest orders</h2>
      <Button variant="outline" onClick={() => navigate('/orders')} className="my-0 py-0 mx-0 px-[22px] bg-white text-text-dark rounded-xl">
        View all
      </Button>
    </div>;
};