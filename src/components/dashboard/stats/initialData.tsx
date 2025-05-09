
import { StatCardData } from "./types";

export const initialCards: StatCardData[] = [
  {
    id: "total-sales",
    title: "Total sales",
    value: "$ 669,112",
    change: { value: 4, trend: "up" }
  },
  {
    id: "profit",
    title: "Profit",
    value: "$ 325,998",
    change: { value: 12, trend: "up" }
  },
  {
    id: "avg-order",
    title: "Average order value",
    value: "$ 498",
    change: { value: 3.8, trend: "up" }
  },
  {
    id: "total-orders",
    title: "Total orders",
    value: "1343",
    change: { value: 6, trend: "down" }
  },
];
