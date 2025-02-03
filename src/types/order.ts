export type OrderStatus = "Paid" | "Processing" | "Waiting";
export type FulfillmentStatus = "Fulfilled" | "Unpaid" | "Open" | "Closed";

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
  fulfillmentStatus: FulfillmentStatus;
  customer: {
    name: string;
    email: string;
  };
  thumbnail?: string;
  itemCount?: number;
  products?: Product[];
}