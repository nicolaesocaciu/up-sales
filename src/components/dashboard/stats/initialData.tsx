
import { StatCardData } from "./types";

export const initialCards: StatCardData[] = [
  {
    id: "total-sales",
    title: "Total sales",
    value: "$ 669,112",
    change: { value: 4, trend: "up" },
    // Static chart data points
    chartData: [20, 25, 20, 30, 35, 25, 38]
  },
  {
    id: "profit",
    title: "Profit",
    value: "$ 325,998",
    change: { value: 12, trend: "up" },
    // Static chart data points
    chartData: [30, 40, 35, 50, 35, 45, 40]
  },
  {
    id: "avg-order",
    title: "Average order value",
    value: "$ 498",
    change: { value: 3.8, trend: "up" },
    // Static chart data points
    chartData: [25, 30, 20, 35, 25, 40, 35]
  },
  {
    id: "total-orders",
    title: "Total orders",
    value: "1343",
    change: { value: 6, trend: "down" },
    // Static chart data points for downward trend
    chartData: [40, 35, 45, 30, 45, 35, 25]
  },
];
