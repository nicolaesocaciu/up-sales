export type OrderStatus = "Paid" | "Processing" | "Waiting";

export type FulfillmentStatus = "Fulfilled" | "Unfulfilled" | "Open" | "Closed" | "Unpaid";

export interface Product {
  title: string;
  description: string;
  images: string[];
}

export interface Customer {
  name: string;
  email: string;
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
  fulfillmentStatus: FulfillmentStatus;
  customer: Customer;
}