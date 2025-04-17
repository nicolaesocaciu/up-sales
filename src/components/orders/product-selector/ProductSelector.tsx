
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
}

interface ProductSelectorProps {
  selectedProducts: Product[];
  onProductsChange: (products: Product[]) => void;
}

export const ProductSelector = ({
  selectedProducts,
  onProductsChange
}: ProductSelectorProps) => {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      // Remove any limit on the query to get all products
      const { data, error } = await supabase
        .from('products')
        .select('id, name, price, category')
        .order('category', { ascending: true });
      
      if (error) {
        console.error('Error fetching products:', error);
        throw error;
      }
      console.log('Fetched products:', data?.length); // Debug log to see total count
      return data || [];
    }
  });

  const handleSelect = (productId: string) => {
    const selectedProduct = products?.find(p => p.id === productId);
    if (selectedProduct) {
      const isAlreadySelected = selectedProducts.some(p => p.id === productId);
      if (!isAlreadySelected) {
        onProductsChange([...selectedProducts, selectedProduct]);
      }
    }
  };

  const groupedProducts = products?.reduce((acc, product) => {
    const category = product.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {} as Record<string, Product[]>) || {};

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-2">
      <Select onValueChange={handleSelect}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a product" />
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
            <SelectGroup key={category}>
              {categoryProducts.map((product) => (
                <SelectItem
                  key={product.id}
                  value={product.id}
                  className="hover:bg-gray-100"
                >
                  {product.name} - {product.price}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>

      {selectedProducts.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-2 bg-secondary px-3 py-1 rounded-md text-sm"
            >
              {product.name}
              <button
                onClick={() => onProductsChange(selectedProducts.filter(p => p.id !== product.id))}
                className="text-muted-foreground hover:text-foreground"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
