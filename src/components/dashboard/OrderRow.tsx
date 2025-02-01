import { TableCell, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { OrderActionsDropdown } from "./OrderActionsDropdown";
import { useState } from "react";
import { Check, CircleDot, AlertOctagon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

type OrderStatus = "Paid" | "Processing" | "Waiting";

export interface Order {
  id: string;
  date: string;
  items: string;
  value: string;
  status: OrderStatus;
  thumbnail?: string;
}

interface OrderRowProps {
  order: Order;
}

const getStatusIcon = (status: OrderStatus) => {
  switch (status) {
    case "Paid":
      return <Check className="w-4 h-4 mr-1" />;
    case "Processing":
      return <CircleDot className="w-4 h-4 mr-1" />;
    case "Waiting":
      return <AlertOctagon className="w-4 h-4 mr-1" />;
  }
};

const ProductDialog = ({ items }: { items: string }) => (
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Product Details</DialogTitle>
    </DialogHeader>
    <div className="p-4">
      <p>{items}</p>
    </div>
  </DialogContent>
);

export const OrderRow = ({ order }: OrderRowProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const thumbnailUrl = order.thumbnail || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=50&h=50&fit=crop";

  return (
    <TableRow className={cn(
      "h-12 transition-colors",
      isDropdownOpen ? "bg-[#E7F2F9]" : "hover:bg-[#E7F2F9]"
    )}>
      <TableCell className="font-medium">{order.id}</TableCell>
      <TableCell>{order.date}</TableCell>
      <TableCell className="text-left">
        <Dialog>
          <DialogTrigger asChild>
            <button className="flex items-center gap-3 text-primary hover:underline">
              <img 
                src={thumbnailUrl} 
                alt="Product thumbnail" 
                className="w-10 h-10 rounded object-cover"
              />
              {order.items}
            </button>
          </DialogTrigger>
          <ProductDialog items={order.items} />
        </Dialog>
      </TableCell>
      <TableCell className="text-right">{order.value}</TableCell>
      <TableCell>
        <Badge
          variant="secondary"
          className={cn(
            "bg-opacity-10 inline-flex items-center",
            order.status === "Paid" && "bg-status-paid text-status-paid",
            order.status === "Processing" && "bg-status-processing text-status-processing",
            order.status === "Waiting" && "bg-status-waiting text-status-waiting"
          )}
        >
          {getStatusIcon(order.status)}
          {order.status}
        </Badge>
      </TableCell>
      <TableCell>
        <OrderActionsDropdown onOpenChange={setIsDropdownOpen} />
      </TableCell>
    </TableRow>
  );
};