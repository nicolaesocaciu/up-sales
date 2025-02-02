import { Product } from "@/types/order";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface OrderItemsProps {
  items: string;
  itemCount?: number;
  thumbnail?: string;
  products?: Product[];
  onProductClick: (product: Product) => void;
}

const renderThumbnails = (thumbnail: string | undefined, itemCount: number = 1) => {
  const thumbnails = Array(itemCount).fill(
    thumbnail || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=24&h=24&fit=crop"
  );

  return (
    <div className="flex items-center">
      {thumbnails.map((thumb, index) => (
        <img
          key={index}
          src={thumb}
          alt={`Product thumbnail ${index + 1}`}
          className="w-6 h-6 rounded object-cover border border-white"
          style={{ marginLeft: index > 0 ? "-10px" : "0" }}
        />
      ))}
    </div>
  );
};

export const OrderItems = ({
  items,
  itemCount = 1,
  thumbnail,
  products,
  onProductClick,
}: OrderItemsProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className="flex items-center gap-3 text-primary hover:underline text-left w-full"
            onClick={() => products?.[0] && onProductClick(products[0])}
          >
            {renderThumbnails(thumbnail, itemCount)}
            <span className="truncate">
              {itemCount > 1 ? `${itemCount} items` : items}
            </span>
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{items}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};