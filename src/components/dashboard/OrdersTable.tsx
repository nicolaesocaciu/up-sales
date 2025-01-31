import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { MoreVertical, ChevronDown, Check } from "lucide-react";
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
  {
    id: "#44218",
    date: "23 Jan 2025",
    items: "2 items",
    value: "$7,720",
    status: "Processing",
  },
];

export const OrdersTable = () => {
  return (
    <div className="rounded-2xl border bg-white shadow-sm">
      <div className="flex items-center justify-between p-6">
        <h2 className="text-xl font-semibold text-text-dark">Latest orders</h2>
        <Button variant="outline" className="text-text-light hover:text-text-dark">
          View all <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-text-light">Order ID</TableHead>
            <TableHead className="text-text-light">
              Date <ChevronDown className="inline-block ml-1 h-4 w-4" />
            </TableHead>
            <TableHead className="text-text-light">Items</TableHead>
            <TableHead className="text-text-light">Order value</TableHead>
            <TableHead className="text-text-light">Status</TableHead>
            <TableHead className="text-text-light">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} className="hover:bg-gray-50">
              <TableCell className="font-medium text-text-dark">
                {order.id}
              </TableCell>
              <TableCell className="text-text-light">{order.date}</TableCell>
              <TableCell>
                <span className="text-primary">{order.items}</span>
              </TableCell>
              <TableCell className="text-text-dark font-medium">
                {order.value}
              </TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={cn(
                    "bg-opacity-10 font-medium",
                    order.status === "Paid" && "bg-status-light-up text-status-paid",
                    order.status === "Processing" &&
                      "bg-blue-50 text-status-processing",
                    order.status === "Waiting" &&
                      "bg-orange-50 text-status-waiting"
                  )}
                >
                  {order.status === "Paid" && (
                    <Check className="mr-1 h-3.5 w-3.5" />
                  )}
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};