
import { useState } from "react";
import { Table, TableBody } from "@/components/ui/table";
import { ProductTableHeader } from "./products-table/ProductTableHeader";
import { ProductTableSortHeader } from "./products-table/ProductTableSortHeader";
import { ProductTableRow } from "./products-table/ProductTableRow";
import { ProductModal } from "./ProductModal";
import { useProductsData } from "@/hooks/useProductsData";
import { Product } from "@/types/product";

interface ProductsTableProps {
  isEditMode?: boolean;
}

export const ProductsTable = ({
  isEditMode
}: ProductsTableProps) => {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const { filteredProducts } = useProductsData({
    stockFilter: null,
    searchQuery: "",
    sortDirection
  });

  const toggleSort = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="rounded-[24px] bg-white h-full">
      <ProductTableHeader title="Top products" />
      <div className="px-6 pb-6">
        <Table>
          <ProductTableSortHeader sortDirection={sortDirection} onSortChange={toggleSort} />
          <TableBody className="[&_tr:last-child]:border-0">
            {filteredProducts.map(product => (
              <ProductTableRow 
                key={product.id} 
                product={product} 
                onViewProduct={handleViewProduct} 
              />
            ))}
          </TableBody>
        </Table>
      </div>
      
      {selectedProduct && (
        <ProductModal 
          open={!!selectedProduct} 
          onOpenChange={open => !open && setSelectedProduct(null)} 
          product={{
            id: selectedProduct.id,
            title: selectedProduct.name,
            description: "This is a sample product description. The actual description would come from your product data.",
            images: selectedProduct.thumbnail ? [selectedProduct.thumbnail] : [],
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
