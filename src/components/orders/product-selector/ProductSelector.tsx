
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

  if (isLoading) return <div className="py-4 text-center">Loading products...</div>;

  return (
    <div className="space-y-4">
      <Select onValueChange={handleSelect}>
        <SelectTrigger className="w-full h-14 text-base px-5 border-2">
          <SelectValue placeholder="Select a product" />
        </SelectTrigger>
        <SelectContent className="max-h-[350px] w-[350px]">
          {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
            <SelectGroup key={category} className="pb-2">
              <div className="px-4 py-2 text-sm font-semibold text-gray-500">{category}</div>
              {categoryProducts.map((product) => (
                <SelectItem
                  key={product.id}
                  value={product.id}
                  className="px-4 py-4 my-1 text-base hover:bg-[#E7F2F9] rounded-md cursor-pointer transition-colors"
                >
                  {product.name} - {product.price}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>

      {selectedProducts.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {selectedProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-2 bg-secondary px-4 py-3 rounded-md text-base"
            >
              {product.name}
              <button
                onClick={() => onProductsChange(selectedProducts.filter(p => p.id !== product.id))}
                className="text-muted-foreground hover:text-foreground ml-2 h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-200"
                aria-label={`Remove ${product.name}`}
              >
                <span className="text-xl font-bold">×</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
