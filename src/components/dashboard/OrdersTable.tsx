import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

const orders = [
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
  return (
    <div className="rounded-lg border bg-white">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Latest orders</h2>
        <Button variant="ghost" className="text-primary">
          View all
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Order value</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[50px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>{order.items}</TableCell>
              <TableCell>{order.value}</TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={cn(
                    "bg-opacity-10",
                    order.status === "Paid" && "bg-status-paid text-status-paid",
                    order.status === "Processing" &&
                      "bg-status-processing text-status-processing",
                    order.status === "Waiting" &&
                      "bg-status-waiting text-status-waiting"
                  )}
                >
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};