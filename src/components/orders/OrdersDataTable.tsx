import { Table, TableBody } from "@/components/ui/table";
import { mockOrders } from "@/data/mockOrders";
import { useState } from "react";
import { OrdersTableHeader } from "./OrdersTableHeader";
import { OrdersTableRow } from "./OrdersTableRow";
import { OrdersTablePagination } from "./OrdersTablePagination";
import { FulfillmentStatus } from "@/types/order";

interface OrdersDataTableProps {
  selectedTab: FulfillmentStatus | "all-orders";
}

export const OrdersDataTable = ({ selectedTab }: OrdersDataTableProps) => {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const sortedOrders = [...mockOrders]
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortDirection === "asc"
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    })
    .filter((order) => 
      selectedTab === "all-orders" ? true : order.fulfillmentStatus === selectedTab
    );

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <Table>
        <OrdersTableHeader
          sortDirection={sortDirection}
          onSortChange={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}
        />
        <TableBody>
          {sortedOrders.map((order) => (
            <OrdersTableRow key={order.id} order={order} />
          ))}
        </TableBody>
      </Table>

      <OrdersTablePagination
        totalOrders={mockOrders.length}
        currentPageSize={sortedOrders.length}
      />
    </div>
  );
};