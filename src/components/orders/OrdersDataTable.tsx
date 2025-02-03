import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreVertical } from "lucide-react";
import { OrderStatusBadge } from "@/components/dashboard/OrderStatusBadge";
import { FulfillmentStatusBadge } from "./FulfillmentStatusBadge";
import { mockOrders } from "@/data/mockOrders";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FulfillmentStatus } from "@/types/order";

export const OrdersDataTable = () => {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedTab, setSelectedTab] = useState<FulfillmentStatus | "all-orders">("all-orders");

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
        <TableHeader>
          <TableRow className="hover:bg-transparent border-b border-gray-200">
            <TableHead className="w-[40px]">
              <Checkbox />
            </TableHead>
            <TableHead>Order ID</TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}
            >
              <div className="flex items-center gap-2">
                Date
                <span className="text-gray-400">
                  {sortDirection === "asc" ? "↑" : "↓"}
                </span>
              </div>
            </TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Order value</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Fulfillment status</TableHead>
            <TableHead className="w-[50px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedOrders.map((order) => (
            <TableRow key={order.id} className="hover:bg-gray-50">
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell className="font-medium">#{order.id}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>
                <span className="text-primary hover:underline cursor-pointer">
                  {order.items}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-primary hover:underline cursor-pointer">
                  {order.customer.name}
                </span>
              </TableCell>
              <TableCell>{order.customer.email}</TableCell>
              <TableCell className="text-right">{order.value}</TableCell>
              <TableCell>
                <OrderStatusBadge status={order.status} />
              </TableCell>
              <TableCell>
                <FulfillmentStatusBadge status={order.fulfillmentStatus} />
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between px-4 py-4 border-t border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Showing 1 to {sortedOrders.length} from {mockOrders.length}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0 bg-primary text-white border-primary hover:bg-primary hover:text-white"
              >
                1
              </Button>
              <span className="text-sm text-gray-500">of 1</span>
            </div>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Select defaultValue="50">
            <SelectTrigger className="w-[70px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};