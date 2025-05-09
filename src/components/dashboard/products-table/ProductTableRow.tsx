
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Product {
  name: string;
  price: string;
  orders: string;
  sales: string;
  thumbnail?: string;
}

interface ProductTableRowProps {
  product: Product;
  onViewProduct: (product: Product) => void;
}

export const ProductTableRow = ({ product, onViewProduct }: ProductTableRowProps) => {
  const getHighResImage = (url: string | undefined) => {
    return url?.replace('w=24&h=24', 'w=800&h=800');
  };

  return (
    <TableRow className="h-12 hover:bg-[#E7F2F9]">
      <TableCell>
        <button
          onClick={() => onViewProduct({
            ...product,
            thumbnail: getHighResImage(product.thumbnail)
          })}
          className="flex items-center gap-3 text-[#116fae] hover:underline"
        >
          <img
            src={product.thumbnail}
            alt={product.name}
            className="w-6 h-6 rounded object-cover"
          />
          <span>{product.name}</span>
        </button>
      </TableCell>
      <TableCell className="text-right">{product.price}</TableCell>
      <TableCell>{product.orders}</TableCell>
      <TableCell className="text-right">{product.sales}</TableCell>
      <TableCell className="text-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className="transition-colors hover:bg-[rgba(153,203,236,0.50)]"
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
              onClick={() => onViewProduct({
                ...product,
                thumbnail: getHighResImage(product.thumbnail)
              })}
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
    </TableRow>
  );
};
