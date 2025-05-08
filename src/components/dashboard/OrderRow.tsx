
import { TableCell, TableRow } from "../ui/table";
import { cn } from "@/lib/utils";
import { OrderActionsDropdown } from "./OrderActionsDropdown";
import { useState } from "react";
import { ProductModal } from "./ProductModal";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { OrderItems } from "./OrderItems";
import { Order, Product } from "@/types/order";
import { OrderDetailsDrawer } from "../orders/OrderDetailsDrawer";

interface OrderRowProps {
  order: Order;
}

export const OrderRow = ({
  order
}: OrderRowProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  
  const handleItemsClick = () => {
    setShowOrderDetails(true);
  };

  const handleOpenOrderDetails = () => {
    setIsDropdownOpen(false); // Close dropdown when opening drawer
    setShowOrderDetails(true);
  };

  const handleOrderDrawerChange = (open: boolean) => {
    setShowOrderDetails(open);
    if (!open) {
      // Ensure dropdown is closed when drawer is closed
      setIsDropdownOpen(false);
    }
  };

  return (
    <TableRow className={cn("h-12 transition-colors max-h-[48px]", isDropdownOpen ? "bg-[#E7F2F9]" : "hover:bg-[#E7F2F9]")}>
      <TableCell className="">
        <button
          className="text-[#116fae] hover:underline text-left"
          onClick={handleOpenOrderDetails}
        >
          {order.id}
        </button>
      </TableCell>
      <TableCell>{order.date}</TableCell>
      <TableCell>
        <OrderItems 
          items={order.items} 
          itemCount={order.itemCount} 
          thumbnail={order.thumbnail} 
          products={order.products} 
          onProductClick={handleItemsClick} 
        />
      </TableCell>
      <TableCell className="text-right truncate">{order.value}</TableCell>
      <TableCell>
        <OrderStatusBadge status={order.status} />
      </TableCell>
      <TableCell>
        <OrderActionsDropdown 
          onOpenChange={setIsDropdownOpen} 
          onViewOrder={handleOpenOrderDetails}
        />
      </TableCell>

      {/* Product Modal (will be removed in favor of the drawer) */}
      {selectedProduct && 
        <ProductModal 
          open={!!selectedProduct} 
          onOpenChange={open => !open && setSelectedProduct(null)} 
          product={selectedProduct} 
        />
      }
      
      {/* Order Details Drawer with improved state handling */}
      <OrderDetailsDrawer
        open={showOrderDetails}
        onOpenChange={handleOrderDrawerChange}
        order={order}
      />
    </TableRow>
  );
};
