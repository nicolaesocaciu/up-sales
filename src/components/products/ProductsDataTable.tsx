
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
import { TableSkeleton } from "@/components/ui/table-skeleton";

const defaultColumnVisibility: ColumnVisibility = {
  name: true,
  price: true,
  stockPrediction: true,
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
  const [stockFilter, setStockFilter] = useState<string | null>(null);

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

      const matchesStockFilter = !stockFilter || product.stock_prediction === stockFilter;

      return matchesSearch && matchesStockFilter;
    });
  }, [products, searchQuery, stockFilter]);

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

      <div className="mb-4 border-b border-gray-200 overflow-x-auto">
        <div className="flex space-x-6 min-w-max">
          <button
            className={`px-0 py-3 text-sm font-medium ${stockFilter === null ? 'text-[#116fae] border-b-2 border-[#116fae]' : 'text-gray-600 hover:text-gray-900'}`}
            onClick={() => setStockFilter(null)}
          >
            All
          </button>
          <button
            className={`px-0 py-3 text-sm font-medium ${stockFilter === 'Out of stock in 1 days' || stockFilter?.startsWith('Out of stock in') ? 'text-[#116fae] border-b-2 border-[#116fae]' : 'text-gray-600 hover:text-gray-900'}`}
            onClick={() => setStockFilter('Out of stock in 1 days')}
          >
            Out of stock ({stockPredictionCounts['Out of stock']})
          </button>
          <button
            className={`px-0 py-3 text-sm font-medium ${stockFilter === 'Low stock' ? 'text-[#116fae] border-b-2 border-[#116fae]' : 'text-gray-600 hover:text-gray-900'}`}
            onClick={() => setStockFilter('Low stock')}
          >
            Low stock ({stockPredictionCounts['Low stock']})
          </button>
          <button
            className={`px-0 py-3 text-sm font-medium ${stockFilter === 'Stable stock' ? 'text-[#116fae] border-b-2 border-[#116fae]' : 'text-gray-600 hover:text-gray-900'}`}
            onClick={() => setStockFilter('Stable stock')}
          >
            Stable stock ({stockPredictionCounts['Stable stock']})
          </button>
          <button
            className={`px-0 py-3 text-sm font-medium ${stockFilter === 'Overstock stock' ? 'text-[#116fae] border-b-2 border-[#116fae]' : 'text-gray-600 hover:text-gray-900'}`}
            onClick={() => setStockFilter('Overstock stock')}
          >
            Overstock ({stockPredictionCounts['Overstock stock']})
          </button>
          <button
            className={`px-0 py-3 text-sm font-medium ${stockFilter === 'Insufficient data' ? 'text-[#116fae] border-b-2 border-[#116fae]' : 'text-gray-600 hover:text-gray-900'}`}
            onClick={() => setStockFilter('Insufficient data')}
          >
            Insufficient data ({stockPredictionCounts['Insufficient data']})
          </button>
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
