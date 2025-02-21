import { Table, TableBody } from "@/components/ui/table";
import { useState, useMemo } from "react";
import { Product } from "@/types/product";
import { ProductsTableHeader } from "./ProductsTableHeader";
import { ProductsTableRow } from "./ProductsTableRow";
import { ProductsTablePagination } from "./ProductsTablePagination";
import { ProductsTableColumns, ColumnVisibility } from "./ProductsTableColumns";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ReactNode } from "react";

const defaultColumnVisibility: ColumnVisibility = {
  name: true,
  price: true,
  orders: true,
  sales: true,
  actions: true,
};

export const ProductsDataTable = () => {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>(defaultColumnVisibility);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [productsPerPage, setProductsPerPage] = useState(20);

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
      return searchQuery === "" || 
        product.name.toLowerCase().includes(searchLower);
    });
  }, [products, searchQuery]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    return filteredProducts.slice(startIndex, startIndex + productsPerPage);
  }, [filteredProducts, currentPage, productsPerPage]);

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

  const highlightText = (text: string): ReactNode => {
    if (!searchQuery) return text;
    
    const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === searchQuery.toLowerCase() ? 
        <span key={i} className="bg-yellow-200">{part}</span> : 
        part
    );
  };

  return (
    <div className="bg-white rounded-xl px-6">
      <div className="py-6 flex items-center justify-between gap-2">
        <div className="relative min-w-[300px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Search product ..." 
            className="pl-10 bg-white border-gray-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
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
                highlightText={highlightText}
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
