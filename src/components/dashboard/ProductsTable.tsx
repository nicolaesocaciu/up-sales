import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";

const products = [
  {
    name: "Apple MacBook Air M3",
    price: "$1,499",
    orders: "250",
    sales: "$299,750",
  },
  {
    name: "Dell XPS 15 Laptop",
    price: "$1,199",
    orders: "180",
    sales: "$215,700",
  },
  {
    name: "Sony WH-1000XM5 Headphones",
    price: "$399",
    orders: "290",
    sales: "$115,710",
  },
  {
    name: "Keychron Q1 Mechanical Keyboard",
    price: "$179",
    orders: "290",
    sales: "$94,230",
  },
  {
    name: "Anker 737 Power Bank",
    price: "$149",
    orders: "300",
    sales: "$44,700",
  },
  {
    name: "Logitech MX Master 3S Mouse",
    price: "$99",
    orders: "280",
    sales: "$27,720",
  },
];

export const ProductsTable = () => {
  return (
    <div className="rounded-[24px] bg-white">
      <div className="flex items-center justify-between px-6 py-6">
        <h2 className="text-lg font-semibold">Top products</h2>
        <Button 
          variant="outline" 
          className="text-primary hover:bg-primary/5"
        >
          View all
        </Button>
      </div>
      <div className="px-6">
        <Table>
          <TableHeader className="bg-[#F2F2F2] rounded-[8px]">
            <TableRow className="h-12 hover:bg-transparent">
              <TableHead className="rounded-l-[8px]">Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Total orders</TableHead>
              <TableHead>Total sales</TableHead>
              <TableHead className="rounded-r-[8px] w-[50px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.name}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.orders}</TableCell>
                <TableCell>{product.sales}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};