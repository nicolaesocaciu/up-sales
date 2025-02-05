import { Order, OrderStatus, FulfillmentStatus } from "@/types/order";

const baseOrders: Order[] = [
  {
    id: "#44213",
    date: "29 Jan 2025",
    items: "MacBook Pro M3, Magic Mouse, Magic Keyboard",
    value: "$9,750",
    status: "Paid" as OrderStatus,
    fulfillmentStatus: "Fulfilled" as FulfillmentStatus,
    customer: {
      name: "John Doe",
      email: "john@example.com"
    },
    thumbnail: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=24&h=24&fit=crop",
    itemCount: 3,
    products: [
      {
        title: "MacBook Pro M3",
        description: "The most powerful MacBook Pro ever with the M3 chip for unprecedented performance.",
        images: [
          "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&h=600&fit=crop"
        ]
      },
      {
        title: "Magic Mouse",
        description: "Apple Magic Mouse with Multi-Touch surface for intuitive gestures.",
        images: [
          "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=600&fit=crop"
        ]
      }
    ]
  },
  {
    id: "#44324",
    date: "27 Jan 2025",
    items: "Anker 737 Power Bank",
    value: "$300",
    status: "Processing" as OrderStatus,
    fulfillmentStatus: "Open" as FulfillmentStatus,
    customer: {
      name: "Jane Smith",
      email: "jane@example.com"
    },
    thumbnail: "https://images.unsplash.com/photo-1618410320928-25228d811631?w=24&h=24&fit=crop",
    products: [
      {
        title: "Anker 737 Power Bank",
        description: "High-capacity power bank with fast charging capabilities.",
        images: [
          "https://images.unsplash.com/photo-1618410320928-25228d811631?w=800&h=600&fit=crop"
        ]
      }
    ]
  },
  {
    id: "#44262",
    date: "27 Jan 2025",
    items: "iPhone 15 Pro Max, AirPods Pro",
    value: "$5,710",
    status: "Paid" as OrderStatus,
    fulfillmentStatus: "Closed" as FulfillmentStatus,
    customer: {
      name: "Alice Johnson",
      email: "alice@example.com"
    },
    thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=24&h=24&fit=crop",
    itemCount: 2
  },
  {
    id: "#44221",
    date: "27 Jan 2025",
    items: "MacBook Air M2, Magic Mouse",
    value: "$1,230",
    status: "Waiting" as OrderStatus,
    fulfillmentStatus: "Unpaid" as FulfillmentStatus,
    customer: {
      name: "Bob Wilson",
      email: "bob@example.com"
    },
    thumbnail: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=24&h=24&fit=crop",
    itemCount: 2
  }
];

// Generate 30 additional orders with proper typing
const additionalOrders: Order[] = Array.from({ length: 30 }, (_, index) => ({
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

export const mockOrders: Order[] = [...baseOrders, ...additionalOrders];