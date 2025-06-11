
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

interface ProductModalHeaderProps {
  title: string;
  onDuplicateProduct: () => void;
}

export const ProductModalHeader = ({
  title,
  onDuplicateProduct
}: ProductModalHeaderProps) => {
  return (
    <SheetHeader className="space-y-6">
      <div className="flex items-center justify-between">
        <SheetTitle className="text-2xl font-bold text-text-dark">{title}</SheetTitle>
        <Button 
          variant="outline" 
          onClick={onDuplicateProduct}
          className="flex items-center gap-2"
        >
          <Copy className="h-4 w-4" />
          <span className="text-sm">Duplicate product</span>
        </Button>
      </div>
    </SheetHeader>
  );
};
