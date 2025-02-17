
import { Order, OrderStatus, FulfillmentStatus } from "@/types/order";

export const baseOrders: Order[] = [
  {
    id: "#44213",
    date: "29 Jan 2025",
    items: "MacBook Pro M3, Magic Mouse, Magic Keyboard",
    value: "$9,750",
    status: "Paid" as OrderStatus,
    fulfillmentStatus: "Fulfilled" as FulfillmentStatus,
    customer: {
      name: "Alexander Wilson",
      email: "alexander.wilson@example.com"
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
    items: "Sony WH-1000XM5, AirPods Pro",
    value: "$648",
    status: "Processing" as OrderStatus,
    fulfillmentStatus: "Open" as FulfillmentStatus,
    customer: {
      name: "Marcus Thompson",
      email: "marcus.thompson@example.com"
    },
    thumbnail: "https://images.unsplash.com/photo-1618410320928-25228d811631?w=24&h=24&fit=crop",
    products: [
      {
        title: "Sony WH-1000XM5",
        description: "Premium noise-canceling headphones with industry-leading technology.",
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
    value: "$1,448",
    status: "Waiting" as OrderStatus,
    fulfillmentStatus: "Closed" as FulfillmentStatus,
    customer: {
      name: "Sebastian Chen",
      email: "sebastian.chen@example.com"
    },
    thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=24&h=24&fit=crop",
    itemCount: 2
  },
  {
    id: "#44221",
    date: "27 Jan 2025",
    items: "MacBook Air M2, Magic Mouse",
    value: "$2,198",
    status: "Paid" as OrderStatus,
    fulfillmentStatus: "Unpaid" as FulfillmentStatus,
    customer: {
      name: "Noah Garcia",
      email: "noah.garcia@example.com"
    },
    thumbnail: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=24&h=24&fit=crop",
    itemCount: 2
  }
];
