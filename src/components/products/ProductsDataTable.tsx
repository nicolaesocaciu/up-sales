
import { useState } from "react";
import { Table, TableBody } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ProductsTableHeader } from "./ProductsTableHeader";
import { ProductsTableRow } from "./ProductsTableRow";
import { ProductsTablePagination } from "./ProductsTablePagination";
import { ProductsTableColumns, ColumnVisibility } from "./ProductsTableColumns";
import { Product } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const ProductsDataTable = () => {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>({
    name: true,
    price: true,
    orders: true,
    sales: true,
    actions: true,
  });
  const productsPerPage = 10;

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*');
      
      if (error) throw error;
      return data as Product[];
    },
  });

  const filteredAndSortedProducts = [...products]
    .sort((a, b) => {
      const salesA = parseFloat(a.sales.replace(/[$,]/g, ""));
      const salesB = parseFloat(b.sales.replace(/[$,]/g, ""));
      return sortDirection === "asc" ? salesA - salesB : salesB - salesA;
    })
    .filter((product) => {
      const searchLower = searchQuery.toLowerCase();
      return searchQuery === "" || 
        product.name.toLowerCase().includes(searchLower);
    });

  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

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

  const highlightText = (text: string) => {
    if (!searchQuery) return text;
    
    const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === searchQuery.toLowerCase() ? 
        <span key={i} className="bg-yellow-200">{part}</span> : 
        part
    );
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl px-6 py-4">
        Loading products...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl px-6">
      <div className="py-6 flex items-center justify-between gap-2">
        <div className="relative min-w-[300px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Search products ..." 
            className="pl-10 bg-white border-gray-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <ProductsTableColumns
            columnVisibility={columnVisibility}
            onColumnVisibilityChange={setColumnVisibility}
          />
        </div>
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
              highlightText={highlightText}
              selected={selectedRows.includes(product.id)}
              onSelect={handleRowSelect}
            />
          ))}
        </TableBody>
      </Table>

      <ProductsTablePagination
        totalProducts={filteredAndSortedProducts.length}
        currentPageSize={paginatedProducts.length}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        productsPerPage={productsPerPage}
      />
    </div>
  );
};
