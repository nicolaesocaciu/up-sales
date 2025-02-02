import { useState } from "react";
import { Table, TableBody } from "../ui/table";
import { OrderTableHeader } from "./OrderTableHeader";
import { OrderTableHeaders } from "./OrderTableHeaders";
import { OrderRow } from "./OrderRow";
import { mockOrders } from "@/data/mockOrders";

export const OrdersTable = () => {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const sortedOrders = [...mockOrders].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortDirection === "asc"
      ? dateA.getTime() - dateB.getTime()
      : dateB.getTime() - dateA.getTime();
  });

  const toggleSort = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  return (
    <div className="rounded-[24px] bg-white">
      <OrderTableHeader />
      <div className="px-6">
        <Table>
          <OrderTableHeaders
            sortDirection={sortDirection}
            onToggleSort={toggleSort}
          />
          <TableBody>
            {sortedOrders.map((order) => (
              <OrderRow key={order.id} order={order} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};