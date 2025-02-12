import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { ChevronDown, ChevronUp, Eye, Pencil } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ProductModal } from "./ProductModal";
import { useNavigate } from "react-router-dom";

interface Product {
  name: string;
  price: string;
  orders: string;
  sales: string;
  thumbnail?: string;
}

interface ProductsTableProps {
  isEditMode?: boolean;
}

const products: Product[] = [
  {
    name: "Apple MacBook Air M3",
    price: "$1,499",
    orders: "250",
    sales: "$299,750",
    thumbnail: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=24&h=24&fit=crop",
  },
  {
    name: "Dell XPS 15 Laptop",
    price: "$1,199",
    orders: "180",
    sales: "$215,700",
    thumbnail: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=24&h=24&fit=crop",
  },
  {
    name: "Sony WH-1000XM5 Headphones",
    price: "$399",
    orders: "290",
    sales: "$115,710",
    thumbnail: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=24&h=24&fit=crop",
  },
  {
    name: "Keychron Q1 Mechanical Keyboard",
    price: "$179",
    orders: "290",
    sales: "$94,230",
    thumbnail: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=24&h=24&fit=crop",
  },
  {
    name: "Anker 737 Power Bank",
    price: "$149",
    orders: "300",
    sales: "$44,700",
    thumbnail: "https://images.unsplash.com/photo-1633114127188-99b4dd741180?w=24&h=24&fit=crop",
  },
  {
    name: "Logitech MX Master 3S Mouse",
    price: "$99",
    orders: "280",
    sales: "$27,720",
    thumbnail: "https://images.unsplash.com/photo-1657214059189-6bace4ad1ab8?w=24&h=24&fit=crop",
  },
];

export const ProductsTable = ({ isEditMode }: ProductsTableProps) => {
  const navigate = useNavigate();
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const sortedProducts = [...products].sort((a, b) => {
    const salesA = parseFloat(a.sales.replace(/[$,]/g, ""));
    const salesB = parseFloat(b.sales.replace(/[$,]/g, ""));
    return sortDirection === "asc" ? salesA - salesB : salesB - salesA;
  });

  const toggleSort = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  return (
    <div className="rounded-[24px] bg-white">
      <div className="flex items-center justify-between px-6 py-6">
        <h2 className="text-lg font-semibold">Top products</h2>
        <Button 
          variant="outline" 
          className="text-primary hover:bg-primary/5"
          onClick={() => navigate('/products')}
        >
          View all
        </Button>
      </div>
      <div className="px-6">
        <Table>
          <TableHeader className="bg-[#F2F2F2] rounded-[8px]">
            <TableRow className="h-12 hover:bg-transparent">
              <TableHead className="rounded-l-[8px]">Product</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead>Total orders</TableHead>
              <TableHead 
                className="text-right cursor-pointer hover:bg-[#DADADA]"
                onClick={toggleSort}
              >
                <div className="flex items-center justify-end gap-2">
                  Total sales
                  {sortDirection === "asc" ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead className="rounded-r-[8px] w-[50px] text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedProducts.map((product) => (
              <TableRow 
                key={product.name}
                className="h-10 hover:bg-[#E7F2F9]"
              >
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
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
    </div>
  );
};
