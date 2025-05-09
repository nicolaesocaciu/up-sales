
import { useState } from "react";
import { Discount } from "@/types/discount";

export interface UseDiscountsSelectionProps {
  paginatedDiscounts: Discount[];
}

export const useDiscountsSelection = ({ paginatedDiscounts }: UseDiscountsSelectionProps) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(paginatedDiscounts.map(discount => discount.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowSelect = (discountId: string, checked: boolean) => {
    setSelectedRows(prev => {
      if (checked) {
        return [...prev, discountId];
      } else {
        return prev.filter(id => id !== discountId);
      }
    });
  };

  return {
    selectedRows,
    handleSelectAll,
    handleRowSelect
  };
};
