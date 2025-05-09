
import { Table, TableBody } from "@/components/ui/table";
import { useState } from "react";
import { ProductsTableHeader } from "./ProductsTableHeader";
import { ProductsTableRow } from "./ProductsTableRow";
import { ProductsTablePagination } from "./ProductsTablePagination";
import { ProductsTableColumns, ColumnVisibility } from "./ProductsTableColumns";
import { ProductsTableSearch } from "./ProductsTableSearch";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { useProductsData } from "@/hooks/useProductsData";
import { useProductsPagination } from "@/hooks/useProductsPagination";
import { useProductsSelection } from "@/hooks/useProductsSelection";
import { highlightText } from "@/utils/textHighlighter";

const defaultColumnVisibility: ColumnVisibility = {
  name: true,
  price: true,
  stockPrediction: true,
  probability: true,
  orders: true,
  sales: true,
  actions: true,
};

interface ProductsDataTableProps {
  stockFilter: string | null;
}

export const ProductsDataTable = ({ stockFilter }: ProductsDataTableProps) => {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>(defaultColumnVisibility);

  // Use custom hooks to manage data, pagination, and selection
  const { filteredProducts, isLoading } = useProductsData({ 
    stockFilter, 
    searchQuery, 
    sortDirection 
  });

  const { 
    currentPage, 
    setCurrentPage, 
    productsPerPage, 
    paginatedProducts, 
    handleProductsPerPageChange 
  } = useProductsPagination({ filteredProducts });

  const { 
    selectedRows, 
    handleSelectAll, 
    handleRowSelect 
  } = useProductsSelection({ paginatedProducts });

  return (
    <div className="bg-white rounded-xl px-6">
      <div className="py-6 flex items-center justify-between gap-2">
        <ProductsTableSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <ProductsTableColumns
          columnVisibility={columnVisibility}
          onColumnVisibilityChange={setColumnVisibility}
        />
      </div>

      <Table>
        <ProductsTableHeader
          sortDirection={sortDirection}
          onSortChange={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}
          columnVisibility={columnVisibility}
          selectedRows={selectedRows}
          onSelectAll={handleSelectAll}
          totalRows={paginatedProducts.length}
        />
        <TableBody>
          {isLoading ? (
            <TableSkeleton columnCount={Object.keys(columnVisibility).length} rowCount={productsPerPage} />
          ) : (
            paginatedProducts.map((product) => (
              <ProductsTableRow
                key={product.id}
                product={product}
                columnVisibility={columnVisibility}
                selected={selectedRows.includes(product.id)}
                onSelect={handleRowSelect}
                highlightText={(text) => highlightText(text, searchQuery)}
              />
            ))
          )}
        </TableBody>
      </Table>

      <ProductsTablePagination
        totalProducts={filteredProducts.length}
        currentPageSize={paginatedProducts.length}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        productsPerPage={productsPerPage}
        onProductsPerPageChange={handleProductsPerPageChange}
      />
    </div>
  );
};
