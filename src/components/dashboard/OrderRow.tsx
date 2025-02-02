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
  itemCount?: number;
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

const renderThumbnails = (order: Order) => {
  const itemCount = order.itemCount || 1;
  const thumbnails = Array(itemCount).fill(order.thumbnail || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=24&h=24&fit=crop");
  
  return (
    <div className="flex items-center">
      {thumbnails.map((thumb, index) => (
        <img 
          key={index}
          src={thumb} 
          alt={`Product thumbnail ${index + 1}`} 
          className="w-6 h-6 rounded object-cover border border-white"
          style={{ marginLeft: index > 0 ? '-10px' : '0' }}
        />
      ))}
    </div>
  );
};

export const OrderRow = ({ order }: OrderRowProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <TableRow className={cn(
      "h-12 transition-colors max-h-[48px]",
      isDropdownOpen ? "bg-[#E7F2F9]" : "hover:bg-[#E7F2F9]"
    )}>
      <TableCell className="font-medium">{order.id}</TableCell>
      <TableCell>{order.date}</TableCell>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <button className="flex items-center gap-3 text-primary hover:underline text-left w-full">
              {renderThumbnails(order)}
              <span className="truncate">{order.items}</span>
            </button>
          </DialogTrigger>
          <ProductDialog items={order.items} />
        </Dialog>
      </TableCell>
      <TableCell className="text-right truncate">{order.value}</TableCell>
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