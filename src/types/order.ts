export type OrderStatus = "Paid" | "Processing" | "Waiting";

export interface Product {
  title: string;
  description?: string;
  images?: string[];
}

export interface Order {
  id: string;
  date: string;
  items: string;
  value: string;
  status: OrderStatus;
  thumbnail?: string;
  itemCount?: number;
  products?: Product[];
}