
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, Pencil, Trash2, MoreHorizontal } from "lucide-react";
import { Product } from "@/types/product";
import { ColumnVisibility } from "./ProductsTableColumns";
import { ReactNode, useState } from "react";
import { ProductModal } from "../dashboard/ProductModal";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Badge } from "../ui/badge";
import { ProbabilitySlider } from "./ProbabilitySlider";

interface ProductsTableRowProps {
  product: Product;
  columnVisibility: ColumnVisibility;
  highlightText: (text: string) => ReactNode;
  selected: boolean;
  onSelect: (productId: string, checked: boolean) => void;
}

export const ProductsTableRow = ({
  product,
  columnVisibility,
  highlightText,
  selected,
  onSelect
}: ProductsTableRowProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    try {
      const { error } = await supabase.from('products').delete().eq('id', product.id);
      if (error) throw error;
      toast({
        title: "Success",
        description: "Product deleted successfully"
      });
      queryClient.invalidateQueries({
        queryKey: ["products"]
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive"
      });
    }
  };

  const handleViewProduct = () => {
    setSelectedProduct(product);
    setIsDropdownOpen(false); // Close dropdown when opening modal
  };

  const handleModalChange = (open: boolean) => {
    if (!open) {
      setSelectedProduct(null);
    }
  };

  const getStockPredictionBadge = (prediction: string) => {
    if (prediction.startsWith('Out of stock in')) {
      return <Badge className="border-[#FAD9DE] bg-[#FFEDEF] text-[#CC334C]">{prediction}</Badge>;
    } else if (prediction === 'Low stock') {
      return <Badge className="border-[#FCDFB1] bg-[#FFF7E4] text-[#B35300]">{prediction}</Badge>;
    } else if (prediction === 'Stable stock') {
      return <Badge className="border-[#CFE7CF] bg-[#EBF7EB] text-[#2D7048]">{prediction}</Badge>;
    } else if (prediction === 'Overstock stock') {
      return <Badge className="border-[#D2EAFA] bg-[#E7F2F9] text-[#0D5788]">{prediction}</Badge>;
    } else {
      return <Badge className="border-[#DADADA] bg-[#F2F2F2] text-[#494A4A]">{prediction}</Badge>;
    }
  };

  return <>
    <TableRow className="h-12 hover:bg-[#E7F2F9] group">
      <TableCell>
        <Checkbox checked={selected} onCheckedChange={checked => onSelect(product.id, checked as boolean)} className="rounded-[4px]" />
      </TableCell>
      
      {columnVisibility.name && <TableCell>
        <button 
          onClick={handleViewProduct} 
          className="flex items-center gap-3 text-[#116fae] hover:underline"
        >
          <img src={product.thumbnail} alt={product.name} className="w-6 h-6 rounded object-cover" />
          <span>{highlightText(product.name)}</span>
        </button>
      </TableCell>}
      
      <TableCell className="">{product.inventory}</TableCell>
      
      {columnVisibility.stockPrediction && <TableCell>{getStockPredictionBadge(product.stock_prediction)}</TableCell>}
      
      {columnVisibility.probability && <TableCell>
        <ProbabilitySlider stockPrediction={product.stock_prediction} />
      </TableCell>}
      
      {columnVisibility.price && <TableCell className="">{product.price}</TableCell>}
      
      {columnVisibility.orders && <TableCell>{product.orders}</TableCell>}
      
      {columnVisibility.sales && <TableCell className="text-right">{product.sales}</TableCell>}
      
      {columnVisibility.actions && <TableCell className="text-center w-[50px]">
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className={`transition-colors ${isDropdownOpen ? 'bg-[rgba(153,203,236,0.50)]' : 'hover:bg-[rgba(153,203,236,0.50)]'}`}
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="w-[200px] p-2 rounded-xl bg-white" 
            sideOffset={-10}
          >
            <DropdownMenuItem 
              className="flex items-center gap-2 px-4 py-3 text-sm cursor-pointer hover:bg-[#E7F2F9] rounded-lg" 
              onClick={handleViewProduct}
            >
              <Eye className="h-5 w-5" />
              View product
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="flex items-center gap-2 px-4 py-3 text-sm cursor-pointer hover:bg-[#E7F2F9] rounded-lg"
            >
              <Pencil className="h-5 w-5" />
              Edit product
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="flex items-center gap-2 px-4 py-3 text-sm cursor-pointer hover:bg-[#E7F2F9] rounded-lg text-red-600" 
              onClick={handleDelete}
            >
              <Trash2 className="h-5 w-5" />
              Delete product
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>}
    </TableRow>

    {selectedProduct && (
      <ProductModal 
        open={!!selectedProduct} 
        onOpenChange={handleModalChange} 
        product={{
          title: selectedProduct.name,
          description: "This is a sample product description. The actual description would come from your product data.",
          images: [selectedProduct.thumbnail],
          vendor: "Sample Vendor",
          productType: "Electronics",
          collections: ["Featured", "New Arrivals"],
          tags: ["electronics", "premium"]
        }} 
      />
    )}
  </>;
};
