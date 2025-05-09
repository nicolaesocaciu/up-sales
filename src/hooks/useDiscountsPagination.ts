
import { useState, useMemo } from "react";
import { Discount } from "@/types/discount";

export interface UseDiscountsPaginationProps {
  filteredDiscounts: Discount[];
}

export const useDiscountsPagination = ({ filteredDiscounts }: UseDiscountsPaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [discountsPerPage, setDiscountsPerPage] = useState(10);

  const paginatedDiscounts = useMemo(() => {
    const startIndex = (currentPage - 1) * discountsPerPage;
    return filteredDiscounts.slice(startIndex, startIndex + discountsPerPage);
  }, [filteredDiscounts, currentPage, discountsPerPage]);

  const handleDiscountsPerPageChange = (value: string) => {
    setDiscountsPerPage(parseInt(value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  return {
    currentPage,
    setCurrentPage,
    discountsPerPage,
    paginatedDiscounts,
    handleDiscountsPerPageChange
  };
};
