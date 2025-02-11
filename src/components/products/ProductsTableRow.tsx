
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, Pencil } from "lucide-react";
import { Product } from "@/types/product";
import { ColumnVisibility } from "./ProductsTableColumns";
import { ReactNode, useState } from "react";
import { ProductModal } from "../dashboard/ProductModal";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

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

  return (
    <>
      <TableRow className="h-10 hover:bg-[#E7F2F9]">
        <TableCell>
          <Checkbox 
            checked={selected}
            onCheckedChange={(checked) => onSelect(product.id, checked as boolean)}
            className="rounded-[4px]"
          />
        </TableCell>
        {columnVisibility.name && (
          <TableCell>
            <button
              onClick={() => setSelectedProduct(product)}
              className="flex items-center gap-3 text-primary hover:underline"
            >
              <img
                src={product.thumbnail}
                alt={product.name}
                className="w-6 h-6 rounded object-cover"
              />
              <span>{highlightText(product.name)}</span>
            </button>
          </TableCell>
        )}
        {columnVisibility.price && (
          <TableCell className="text-right">{product.price}</TableCell>
        )}
        {columnVisibility.orders && (
          <TableCell>{product.orders}</TableCell>
        )}
        {columnVisibility.sales && (
          <TableCell className="text-right">{product.sales}</TableCell>
        )}
        {columnVisibility.actions && (
          <TableCell className="text-center">
            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className={`transition-colors ${isDropdownOpen ? 'bg-[rgba(153,203,236,0.50)]' : 'hover:bg-[rgba(153,203,236,0.50)]'}`}
                >
                  <svg width="16" height="4" viewBox="0 0 16 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0ZM14 0C12.9 0 12 0.9 12 2C12 3.1 12.9 4 14 4C15.1 4 16 3.1 16 2C16 0.9 15.1 0 14 0ZM8 0C6.9 0 6 0.9 6 2C6 3.1 6.9 4 8 4C9.1 4 10 3.1 10 2C10 0.9 9.1 0 8 0Z" fill="#494A4A"/>
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-[200px] p-2 rounded-xl bg-white"
                sideOffset={-10}
              >
                <DropdownMenuItem 
                  className="flex items-center gap-2 px-4 py-3 text-sm cursor-pointer hover:bg-[#E7F2F9] rounded-lg"
                  onClick={() => setSelectedProduct(product)}
                >
                  <Eye className="h-5 w-5" />
                  View product
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 px-4 py-3 text-sm cursor-pointer hover:bg-[#E7F2F9] rounded-lg">
                  <Pencil className="h-5 w-5" />
                  Edit product
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        )}
      </TableRow>

      {selectedProduct && (
        <ProductModal
          open={!!selectedProduct}
          onOpenChange={(open) => !open && setSelectedProduct(null)}
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
    </>
  );
};
