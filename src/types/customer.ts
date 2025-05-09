
export type SubscriptionStatus = "subscribed" | "not_subscribed" | "pending";

export interface Customer {
  id: string;
  name: string;
  email: string;
  avatar: string;
  location: string;
  orders: number | "N/A";
  amountSpent: number;
  subscriptionStatus: SubscriptionStatus;
}
