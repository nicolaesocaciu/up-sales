
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

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
        className="text-primary hover:bg-primary/5"
        onClick={() => navigate('/products')}
      >
        View all
      </Button>
    </div>
  );
};
