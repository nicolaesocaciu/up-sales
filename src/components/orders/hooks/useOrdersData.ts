
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { FulfillmentStatus, Order, OrderStatus } from "@/types/order";

export function useOrdersData(selectedTab: FulfillmentStatus | "all-orders") {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | null>(null);
  const [fulfillmentStatusFilter, setFulfillmentStatusFilter] = useState<FulfillmentStatus | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [ordersPerPage, setOrdersPerPage] = useState(20);

  const { data: orders = [], isLoading } = useQuery({
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

  return {
    sortDirection,
    setSortDirection,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    fulfillmentStatusFilter, 
    setFulfillmentStatusFilter,
    currentPage,
    setCurrentPage,
    selectedRows,
    ordersPerPage,
    isLoading,
    filteredAndSortedOrders,
    paginatedOrders,
    handleSelectAll,
    handleRowSelect,
    handleOrdersPerPageChange
  };
}
