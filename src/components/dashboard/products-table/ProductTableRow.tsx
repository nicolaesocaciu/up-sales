
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Pencil } from "lucide-react";
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
    <TableRow className="h-10 hover:bg-[#E7F2F9]">
      <TableCell>
        <button
          onClick={() => onViewProduct({
            ...product,
            thumbnail: getHighResImage(product.thumbnail)
          })}
          className="flex items-center gap-3 text-primary hover:underline"
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
              <svg width="4" height="16" viewBox="0 0 4 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4ZM2 6C0.9 6 0 6.9 0 8C0 9.1 0.9 10 2 10C3.1 10 4 9.1 4 8C4 6.9 3.1 6 2 6ZM2 12C0.9 12 0 12.9 0 14C0 15.1 0.9 16 2 16C3.1 16 4 15.1 4 14C4 12.9 3.1 12 2 12Z" fill="#494A4A"/>
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
