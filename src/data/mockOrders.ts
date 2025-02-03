import { Order } from "@/types/order";

export const mockOrders: Order[] = [
  {
    id: "ORD001",
    date: "2024-02-01",
    items: "iPhone 15 Pro Max",
    value: "1,299.00",
    status: "Paid",
    thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=24&h=24&fit=crop",
    itemCount: 1,
    products: [
      {
        title: "iPhone 15 Pro Max",
        description: "The latest iPhone with amazing features",
        images: [
          "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=300&fit=crop",
          "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=300&fit=crop"
        ]
      }
    ],
    fulfillmentStatus: "Fulfilled",
    customer: {
      name: "John Doe",
      email: "john@example.com"
    }
  },
  {
    id: "ORD002",
    date: "2024-02-02",
    items: "MacBook Pro M3",
    value: "2,499.00",
    status: "Processing",
    thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=24&h=24&fit=crop",
    products: [
      {
        title: "MacBook Pro M3",
        description: "Powerful laptop for professionals",
        images: [
          "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=300&fit=crop"
        ]
      }
    ],
    fulfillmentStatus: "Open",
    customer: {
      name: "Jane Smith",
      email: "jane@example.com"
    }
  },
  {
    id: "ORD003",
    date: "2024-02-03",
    items: "AirPods Pro",
    value: "249.00",
    status: "Paid",
    thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=24&h=24&fit=crop",
    itemCount: 1,
    fulfillmentStatus: "Closed",
    customer: {
      name: "Bob Wilson",
      email: "bob@example.com"
    }
  },
  {
    id: "ORD004",
    date: "2024-02-04",
    items: "iPad Air",
    value: "599.00",
    status: "Waiting",
    thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=24&h=24&fit=crop",
    itemCount: 1,
    fulfillmentStatus: "Unpaid",
    customer: {
      name: "Alice Johnson",
      email: "alice@example.com"
    }
  },
  {
    id: "ORD005",
    date: "2024-02-05",
    items: "Apple Watch Series 9",
    value: "399.00",
    status: "Paid",
    thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=24&h=24&fit=crop",
    fulfillmentStatus: "Fulfilled",
    customer: {
      name: "Charlie Brown",
      email: "charlie@example.com"
    }
  },
  {
    id: "ORD006",
    date: "2024-02-06",
    items: "Mac Mini",
    value: "699.00",
    status: "Processing",
    thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=24&h=24&fit=crop",
    itemCount: 1,
    fulfillmentStatus: "Unfulfilled",
    customer: {
      name: "David Lee",
      email: "david@example.com"
    }
  },
  {
    id: "ORD007",
    date: "2024-02-07",
    items: "Magic Keyboard",
    value: "299.00",
    status: "Waiting",
    thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=24&h=24&fit=crop",
    itemCount: 1,
    fulfillmentStatus: "Unpaid",
    customer: {
      name: "Eva Martinez",
      email: "eva@example.com"
    }
  }
];