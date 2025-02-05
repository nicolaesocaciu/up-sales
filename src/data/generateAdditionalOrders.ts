import { Order, OrderStatus, FulfillmentStatus } from "@/types/order";

export const generateAdditionalOrders = (count: number): Order[] => 
  Array.from({ length: count }, (_, index) => ({
    id: `#${44400 + index}`,
    date: "25 Jan 2025",
    items: "Additional Product Item",
    value: "$999",
    status: "Paid" as OrderStatus,
    fulfillmentStatus: "Open" as FulfillmentStatus,
    customer: {
      name: `Customer ${index + 1}`,
      email: `customer${index + 1}@example.com`
    },
    thumbnail: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=24&h=24&fit=crop",
    itemCount: 1,
    products: [
      {
        title: "Additional Product",
        description: "Description for additional product",
        images: [
          "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop"
        ]
      }
    ]
  }));