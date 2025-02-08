
import { Table, TableBody } from "@/components/ui/table";
import { mockOrders } from "@/data/mockOrders";
import { useState, useMemo, ReactNode } from "react";
import { OrdersTableHeader } from "./OrdersTableHeader";
import { OrdersTableRow } from "./OrdersTableRow";
import { OrdersTablePagination } from "./OrdersTablePagination";
import { FulfillmentStatus } from "@/types/order";
import { ColumnVisibility } from "./OrdersTableColumns";

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
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>(defaultColumnVisibility);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const ordersPerPage = 10;

  const filteredAndSortedOrders = useMemo(() => {
    return [...mockOrders]
      .sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortDirection === "asc"
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      })
      .filter((order) => {
        const matchesTab = selectedTab === "all-orders" ? true : order.fulfillmentStatus === selectedTab;
        return matchesTab;
      });
  }, [mockOrders, sortDirection, selectedTab]);

  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * ordersPerPage;
    return filteredAndSortedOrders.slice(startIndex, startIndex + ordersPerPage);
  }, [filteredAndSortedOrders, currentPage]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(paginatedOrders.map(order => order.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowSelect = (orderId: string, checked: boolean) => {
    if (checked) {
      setSelectedRows(prev => [...prev, orderId]);
    } else {
      setSelectedRows(prev => prev.filter(id => id !== orderId));
    }
  };

  // Add highlightText function to handle text highlighting
  const highlightText = (text: string): ReactNode => {
    return text; // Simple implementation - just returns the text as is
  };

  return (
    <div className="p-6 bg-white rounded-xl">
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
              selected={selectedRows.includes(order.id)}
              onSelect={handleRowSelect}
              highlightText={highlightText}
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
      />
    </div>
  );
};
