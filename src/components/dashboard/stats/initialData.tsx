
import { StatCardData } from "./types";

// No longer need the static miniChartData since charts will be generated dynamically

export const initialCards: StatCardData[] = [
  {
    id: "total-sales",
    title: "Total sales",
    value: "$669,112",
    change: { value: 4, trend: "up" },
    // chart will be dynamically generated in StatsSection component
  },
  {
    id: "profit",
    title: "Profit",
    value: "$325,998",
    change: { value: 12, trend: "up" },
    // chart will be dynamically generated in StatsSection component
  },
  {
    id: "avg-order",
    title: "Average order value",
    value: "$498",
    change: { value: 8, trend: "up" },
    // chart will be dynamically generated in StatsSection component
  },
  {
    id: "total-orders",
    title: "Total orders",
    value: "1343",
    change: { value: 6, trend: "down" },
    // chart will be dynamically generated in StatsSection component
  },
];
