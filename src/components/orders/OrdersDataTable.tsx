
import { Table, TableBody } from "@/components/ui/table";
import { useState, useMemo } from "react";
import { OrdersTableHeader } from "./OrdersTableHeader";
import { OrdersTableRow } from "./OrdersTableRow";
import { OrdersTablePagination } from "./OrdersTablePagination";
import { FulfillmentStatus, OrderStatus, Order } from "@/types/order";
import { OrdersTableColumns, ColumnVisibility } from "./OrdersTableColumns";
import { OrdersTableFilters } from "./OrdersTableFilters";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface OrdersDataTableProps {
  selectedTab: FulfillmentStatus | "all-orders";
}

const defaultColumnVisibility: ColumnVisibility = {
  orderId: true,
  date: true,
  items: true,
  customer: true,
  email: true,
  orderValue: true,
  status: true,
  fulfillmentStatus: true,
  actions: true,
};

export const OrdersDataTable = ({ selectedTab }: OrdersDataTableProps) => {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | null>(null);
  const [fulfillmentStatusFilter, setFulfillmentStatusFilter] = useState<FulfillmentStatus | null>(null);
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>(defaultColumnVisibility);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [ordersPerPage, setOrdersPerPage] = useState(20);

  const { data: orders = [] } = useQuery({
    queryKey: ['orders', sortDirection],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('date', { ascending: sortDirection === 'asc' });
      
      if (error) throw error;
      
      return data.map(order => ({
        id: order.id,
        date: new Date(order.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }),
        items: order.items,
        value: order.value,
        status: order.status as OrderStatus,
        fulfillmentStatus: order.fulfillment_status as FulfillmentStatus,
        customer: {
          name: order.customer_name,
          email: order.customer_email
        },
        thumbnail: order.thumbnail,
        itemCount: order.item_count || 1,
        products: Array.isArray(order.products) 
          ? order.products.map((product: any) => ({
              title: product.title || 'Untitled Product',
              description: product.description || '',
              images: product.images || []
            }))
          : typeof order.products === 'object' && order.products !== null
            ? [order.products].map((product: any) => ({
                title: product.title || 'Untitled Product',
                description: product.description || '',
                images: product.images || []
              }))
            : []
      })) as Order[];
    },
  });

  const filteredAndSortedOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesTab = selectedTab === "all-orders" ? true : order.fulfillmentStatus === selectedTab;
      const matchesStatus = !statusFilter || order.status === statusFilter;
      const matchesFulfillmentStatus = !fulfillmentStatusFilter || order.fulfillmentStatus === fulfillmentStatusFilter;
      
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = searchQuery === "" || 
        order.items.toLowerCase().includes(searchLower) ||
        order.customer.name.toLowerCase().includes(searchLower) ||
        order.customer.email.toLowerCase().includes(searchLower);

      return matchesTab && matchesStatus && matchesFulfillmentStatus && matchesSearch;
    });
  }, [orders, selectedTab, statusFilter, fulfillmentStatusFilter, searchQuery]);

  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * ordersPerPage;
    return filteredAndSortedOrders.slice(startIndex, startIndex + ordersPerPage);
  }, [filteredAndSortedOrders, currentPage, ordersPerPage]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(paginatedOrders.map(order => order.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowSelect = (orderId: string, checked: boolean) => {
    setSelectedRows(prev => {
      if (checked) {
        return [...prev, orderId];
      } else {
        return prev.filter(id => id !== orderId);
      }
    });
  };

  const handleOrdersPerPageChange = (value: string) => {
    setOrdersPerPage(parseInt(value));
    setCurrentPage(1); // Reset to first page when changing items per page
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

  return (
    <div className="bg-white rounded-xl px-6">
      <div className="py-6 flex items-center justify-between gap-2">
        <div className="relative min-w-[300px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Search order ..." 
            className="pl-10 bg-white border-gray-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <OrdersTableFilters
            onStatusFilterChange={setStatusFilter}
            onFulfillmentStatusFilterChange={setFulfillmentStatusFilter}
            selectedStatus={statusFilter}
            selectedFulfillmentStatus={fulfillmentStatusFilter}
          />
          <OrdersTableColumns
            columnVisibility={columnVisibility}
            onColumnVisibilityChange={setColumnVisibility}
          />
        </div>
      </div>

      <Table>
        <OrdersTableHeader
          sortDirection={sortDirection}
          onSortChange={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}
          columnVisibility={columnVisibility}
          selectedRows={selectedRows}
          onSelectAll={handleSelectAll}
          totalRows={paginatedOrders.length}
        />
        <TableBody>
          {paginatedOrders.map((order) => (
            <OrdersTableRow 
              key={order.id} 
              order={order} 
              columnVisibility={columnVisibility}
              highlightText={highlightText}
              selected={selectedRows.includes(order.id)}
              onSelect={handleRowSelect}
            />
          ))}
        </TableBody>
      </Table>

      <OrdersTablePagination
        totalOrders={filteredAndSortedOrders.length}
        currentPageSize={paginatedOrders.length}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        ordersPerPage={ordersPerPage}
        onOrdersPerPageChange={handleOrdersPerPageChange}
      />
    </div>
  );
};
