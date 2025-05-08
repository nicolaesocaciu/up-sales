import { Badge } from "../ui/badge";
import { OrderItem } from "./types/orderTypes";
import { OrderItemRow } from "./OrderItemRow";
interface OrderItemsListProps {
  items: OrderItem[];
  fulfillmentStatus: string;
}
export const OrderItemsList = ({
  items,
  fulfillmentStatus
}: OrderItemsListProps) => {
  return <div className="py-6">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="font-bold text-lg">Items</h2>
        <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200 font-medium">
          {fulfillmentStatus}
        </Badge>
      </div>

      <div>
        {items.map((item, index) => <div key={index} className={`${index > 0 ? 'pt-2' : ''}`}>
            <OrderItemRow item={item} />
          </div>)}
      </div>
    </div>;
};