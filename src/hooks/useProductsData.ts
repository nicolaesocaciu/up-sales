
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types/product";
import { supabase } from "@/integrations/supabase/client";

export interface UseProductsDataProps {
  stockFilter: string | null;
  searchQuery: string;
  sortDirection: "asc" | "desc";
}

export const useProductsData = ({ stockFilter, searchQuery, sortDirection }: UseProductsDataProps) => {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products', sortDirection],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('sales', { ascending: sortDirection === 'asc' });
      
      if (error) throw error;
      return data as Product[];
    },
  });

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = searchQuery === "" || 
        product.name.toLowerCase().includes(searchLower);

      let matchesStockFilter = true;
      
      if (stockFilter) {
        if (stockFilter === 'Out of stock') {
          matchesStockFilter = product.stock_prediction.startsWith('Out of stock in');
        } else {
          matchesStockFilter = product.stock_prediction === stockFilter;
        }
      }

      return matchesSearch && matchesStockFilter;
    });
  }, [products, searchQuery, stockFilter]);

  // Calculate counts for each stock prediction category
  const stockPredictionCounts = useMemo(() => {
    const counts: Record<string, number> = {
      'Low stock': 0,
      'Stable stock': 0,
      'Overstock stock': 0,
      'Insufficient data': 0,
      'Out of stock': 0,
    };
    
    products.forEach(product => {
      if (product.stock_prediction.startsWith('Out of stock in')) {
        counts['Out of stock']++;
      } else if (counts.hasOwnProperty(product.stock_prediction)) {
        counts[product.stock_prediction]++;
      }
    });

    return counts;
  }, [products]);

  return {
    products,
    filteredProducts,
    isLoading,
    stockPredictionCounts
  };
};
