
import { useState } from "react";
import { Discount } from "@/types/discount";

interface UseDiscountsSelectionProps {
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

  const handleRowSelect = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRows(prev => [...prev, id]);
    } else {
      setSelectedRows(prev => prev.filter(rowId => rowId !== id));
    }
  };

  return {
    selectedRows,
    handleSelectAll,
    handleRowSelect
  };
};
