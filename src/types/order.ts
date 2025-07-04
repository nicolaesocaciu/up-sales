
export type OrderStatus = "Paid" | "Processing" | "Waiting";
export type FulfillmentStatus = "Fulfilled" | "Unfulfilled" | "Unpaid" | "Open" | "Closed";

export interface Product {
  title: string;
  description?: string;
  images?: string[];
  price?: string;
  quantity?: number;
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
