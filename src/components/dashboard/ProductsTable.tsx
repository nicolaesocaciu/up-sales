
import { useState } from "react";
import { Table, TableBody } from "@/components/ui/table";
import { ProductTableHeader } from "./products-table/ProductTableHeader";
import { ProductTableSortHeader } from "./products-table/ProductTableSortHeader";
import { ProductTableRow } from "./products-table/ProductTableRow";
import { ProductModal } from "./ProductModal";

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
      <ProductTableHeader title="Top products" />
      <div className="px-6">
        <Table>
          <ProductTableSortHeader 
            sortDirection={sortDirection}
            onSortChange={toggleSort}
          />
          <TableBody>
            {sortedProducts.map((product) => (
              <ProductTableRow 
                key={product.name} 
                product={product}
                onViewProduct={setSelectedProduct}
              />
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
