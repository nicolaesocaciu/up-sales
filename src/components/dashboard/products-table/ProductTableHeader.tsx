
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface ProductTableHeaderProps {
  title: string;
}

export const ProductTableHeader = ({ title }: ProductTableHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between px-6 py-6">
      <h2 className="text-lg font-semibold">{title}</h2>
      <Button 
        variant="outline" 
        className="my-0 py-0 mx-0 px-[16px] h-[30px] flex items-center gap-1"
        onClick={() => navigate('/products')}
      >
        View all
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
