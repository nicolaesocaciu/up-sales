import { Table, TableBody } from "@/components/ui/table";
import { OrdersTableHeader } from "./OrdersTableHeader";
import { OrdersTableRow } from "./OrdersTableRow";
import { OrdersTablePagination } from "./OrdersTablePagination";
import { FulfillmentStatus } from "@/types/order";
import { OrdersTableColumns, ColumnVisibility } from "./OrdersTableColumns";
import { OrdersTableFilters } from "./OrdersTableFilters";
import { useState } from "react";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { useOrdersData } from "./hooks/useOrdersData";
import { OrdersTableSearch } from "./OrdersTableSearch";
import { highlightText } from "./utils/textHighlighter";
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
  actions: true
};
export const OrdersDataTable = ({
  selectedTab
}: OrdersDataTableProps) => {
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>(defaultColumnVisibility);
  const {
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
  } = useOrdersData(selectedTab);
  return <div className="bg-white rounded-xl px-6">
      <div className="py-6 flex items-center justify-between gap-2">
        <OrdersTableSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <div className="flex items-center gap-2 h-[30px]">
          <OrdersTableFilters onStatusFilterChange={setStatusFilter} onFulfillmentStatusFilterChange={setFulfillmentStatusFilter} selectedStatus={statusFilter} selectedFulfillmentStatus={fulfillmentStatusFilter} />
          <OrdersTableColumns columnVisibility={columnVisibility} onColumnVisibilityChange={setColumnVisibility} />
        </div>
      </div>

      <Table>
        <OrdersTableHeader sortDirection={sortDirection} onSortChange={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")} columnVisibility={columnVisibility} selectedRows={selectedRows} onSelectAll={handleSelectAll} totalRows={paginatedOrders.length} />
        <TableBody>
          {isLoading ? <TableSkeleton columnCount={Object.keys(columnVisibility).length} rowCount={ordersPerPage} /> : paginatedOrders.map(order => <OrdersTableRow key={order.id} order={order} columnVisibility={columnVisibility} highlightText={text => highlightText(text, searchQuery)} selected={selectedRows.includes(order.id)} onSelect={handleRowSelect} />)}
        </TableBody>
      </Table>

      <OrdersTablePagination totalOrders={filteredAndSortedOrders.length} currentPageSize={paginatedOrders.length} currentPage={currentPage} onPageChange={setCurrentPage} ordersPerPage={ordersPerPage} onOrdersPerPageChange={handleOrdersPerPageChange} />
    </div>;
};