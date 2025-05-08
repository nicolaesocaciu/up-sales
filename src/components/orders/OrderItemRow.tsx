
import { OrderItem } from "./types/orderTypes";

interface OrderItemRowProps {
  item: OrderItem;
}

export const OrderItemRow = ({ item }: OrderItemRowProps) => {
  return (
    <div className="flex gap-4">
      <div className="w-16 h-16 rounded">
        {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-contain" />}
      </div>
      <div className="flex-1">
        <h3 className="font-medium" style={{
          color: "#116fae"
        }}>{item.name}</h3>
        <p className="text-[#494A4A]">SKU: {item.sku}</p>
      </div>
      <div className="text-right">
        <p className="font-medium">{item.total}</p>
        <p className="text-[#494A4A]">{item.price} × {item.quantity}</p>
      </div>
    </div>
  );
};
