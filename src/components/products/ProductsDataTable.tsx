
import { Table, TableBody } from "@/components/ui/table";
import { useState, useMemo } from "react";
import { Product } from "@/types/product";
import { ProductsTableHeader } from "./ProductsTableHeader";
import { ProductsTableRow } from "./ProductsTableRow";
import { ProductsTablePagination } from "./ProductsTablePagination";
import { ProductsTableColumns, ColumnVisibility } from "./ProductsTableColumns";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const defaultColumnVisibility: ColumnVisibility = {
  name: true,
  price: true,
  orders: true,
  sales: true,
  actions: true,
};

export const ProductsDataTable = () => {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>(defaultColumnVisibility);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [productsPerPage, setProductsPerPage] = useState(20);

  const { data: products = [] } = useQuery({
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

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    return products.slice(startIndex, startIndex + productsPerPage);
  }, [products, currentPage, productsPerPage]);

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

  const handleProductsPerPageChange = (value: string) => {
    setProductsPerPage(parseInt(value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  return (
    <div className="bg-white rounded-xl px-6">
      <div className="py-6 flex items-center justify-end gap-2">
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
          {paginatedProducts.map((product) => (
            <ProductsTableRow
              key={product.id}
              product={product}
              columnVisibility={columnVisibility}
              selected={selectedRows.includes(product.id)}
              onSelect={handleRowSelect}
            />
          ))}
        </TableBody>
      </Table>

      <ProductsTablePagination
        totalProducts={products.length}
        currentPageSize={paginatedProducts.length}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        productsPerPage={productsPerPage}
        onProductsPerPageChange={handleProductsPerPageChange}
      />
    </div>
  );
};
