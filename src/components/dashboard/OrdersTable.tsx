import { useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { ChevronDown, ChevronUp } from "lucide-react";
import { OrderTableHeader } from "./OrderTableHeader";
import { OrderRow, Order } from "./OrderRow";

const orders: Order[] = [
  {
    id: "#44213",
    date: "29 Jan 2025",
    items: "3 items",
    value: "$9,750",
    status: "Paid",
  },
  {
    id: "#44324",
    date: "27 Jan 2025",
    items: "Anker 737 Power Bank",
    value: "$300",
    status: "Processing",
  },
  {
    id: "#44262",
    date: "27 Jan 2025",
    items: "2 items",
    value: "$5,710",
    status: "Paid",
  },
  {
    id: "#44221",
    date: "27 Jan 2025",
    items: "2 items",
    value: "$1,230",
    status: "Waiting",
  },
  {
    id: "#44256",
    date: "25 Jan 2025",
    items: "Logitech MX Master 3S Mouse",
    value: "$700",
    status: "Paid",
  },
];

export const OrdersTable = () => {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const sortedOrders = [...orders].sort((a, b) => {
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
          <TableHeader className="bg-[#F2F2F2] rounded-[8px]">
            <TableRow className="h-12 hover:bg-transparent">
              <TableHead className="rounded-l-[8px]">Order ID</TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-[#DADADA]"
                onClick={toggleSort}
              >
                <div className="flex items-center gap-2">
                  Date
                  {sortDirection === "asc" ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Order value</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="rounded-r-[8px] w-[50px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
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