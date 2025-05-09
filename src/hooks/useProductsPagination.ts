
import { useState, useMemo } from "react";
import { Product } from "@/types/product";

export interface UseProductsPaginationProps {
  filteredProducts: Product[];
}

export const useProductsPagination = ({ filteredProducts }: UseProductsPaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(20);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    return filteredProducts.slice(startIndex, startIndex + productsPerPage);
  }, [filteredProducts, currentPage, productsPerPage]);

  const handleProductsPerPageChange = (value: string) => {
    setProductsPerPage(parseInt(value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  return {
    currentPage,
    setCurrentPage,
    productsPerPage,
    paginatedProducts,
    handleProductsPerPageChange
  };
};
