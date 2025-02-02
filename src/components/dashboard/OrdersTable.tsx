import { useState } from "react";
import { Table, TableBody } from "../ui/table";
import { OrderTableHeader } from "./OrderTableHeader";
import { OrderTableHeaders } from "./OrderTableHeaders";
import { OrderRow, Order } from "./OrderRow";

const orders: Order[] = [
  {
    id: "#44213",
    date: "29 Jan 2025",
    items: "MacBook Pro M3, Magic Mouse, Magic Keyboard",
    value: "$9,750",
    status: "Paid",
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
    status: "Processing",
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
    status: "Paid",
    thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=24&h=24&fit=crop",
    itemCount: 2
  },
  {
    id: "#44221",
    date: "27 Jan 2025",
    items: "MacBook Air M2, Magic Mouse",
    value: "$1,230",
    status: "Waiting",
    thumbnail: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=24&h=24&fit=crop",
    itemCount: 2
  },
  {
    id: "#44256",
    date: "25 Jan 2025",
    items: "Logitech MX Master 3S Mouse",
    value: "$700",
    status: "Paid",
    thumbnail: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=24&h=24&fit=crop"
  },
  {
    id: "#44289",
    date: "24 Jan 2025",
    items: "iPad Pro 12.9, Apple Pencil, Magic Keyboard",
    value: "$2,890",
    status: "Processing",
    thumbnail: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=24&h=24&fit=crop",
    itemCount: 3
  },
  {
    id: "#44290",
    date: "24 Jan 2025",
    items: "Dell XPS 15, Wireless Keyboard, Wireless Mouse",
    value: "$3,450",
    status: "Waiting",
    thumbnail: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=24&h=24&fit=crop",
    itemCount: 3
  }
];

export const OrdersTable = () => {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const sortedOrders = [...orders].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortDirection === "asc" 
      ? dateA.getTime() - dateB.getTime()
      : dateB.getTime() - dateA.getTime();
  });

  const toggleSort = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  return (
    <div className="rounded-[24px] bg-white">
      <OrderTableHeader />
      <div className="px-6">
        <Table>
          <OrderTableHeaders 
            sortDirection={sortDirection}
            onToggleSort={toggleSort}
          />
          <TableBody>
            {sortedOrders.map((order) => (
              <OrderRow key={order.id} order={order} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
