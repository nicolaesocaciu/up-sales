
import { useState } from "react";
import { Product } from "@/types/product";

export interface UseProductsSelectionProps {
  paginatedProducts: Product[];
}

export const useProductsSelection = ({ paginatedProducts }: UseProductsSelectionProps) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(paginatedProducts.map(product => product.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowSelect = (productId: string, checked: boolean) => {
    setSelectedRows(prev => {
      if (checked) {
        return [...prev, productId];
      } else {
        return prev.filter(id => id !== productId);
      }
    });
  };

  return {
    selectedRows,
    handleSelectAll,
    handleRowSelect
  };
};
