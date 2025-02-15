
import { TableCell, TableRow } from "../ui/table";
import { cn } from "@/lib/utils";
import { OrderActionsDropdown } from "./OrderActionsDropdown";
import { useState } from "react";
import { ProductModal } from "./ProductModal";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { OrderItems } from "./OrderItems";
import { Order, Product } from "@/types/order";

interface OrderRowProps {
  order: Order;
  onDelete?: () => void;
}

export const OrderRow = ({
  order,
  onDelete
}: OrderRowProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <TableRow 
      className={cn(
        "h-12 transition-colors max-h-[48px]", 
        isDropdownOpen ? "bg-[#E7F2F9]" : "hover:bg-[#E7F2F9]"
      )}
    >
      <TableCell className="">{order.id}</TableCell>
      <TableCell>{order.date}</TableCell>
      <TableCell>
        <OrderItems 
          items={order.items} 
          itemCount={order.itemCount} 
          thumbnail={order.thumbnail} 
          products={order.products} 
          onProductClick={product => setSelectedProduct(product)} 
        />
      </TableCell>
      <TableCell className="text-right truncate">{order.value}</TableCell>
      <TableCell>
        <OrderStatusBadge status={order.status} />
      </TableCell>
      <TableCell>
        <OrderActionsDropdown 
          onOpenChange={setIsDropdownOpen} 
          orderId={order.id}
          onDelete={onDelete}
        />
      </TableCell>

      {selectedProduct && (
        <ProductModal 
          open={!!selectedProduct} 
          onOpenChange={open => !open && setSelectedProduct(null)} 
          product={selectedProduct} 
        />
      )}
    </TableRow>
  );
};
