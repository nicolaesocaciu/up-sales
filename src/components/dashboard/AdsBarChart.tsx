
import { useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

const weekData = [
  { name: "Mon", clicks: 2100, impressions: 1200 },
  { name: "Tue", clicks: 3200, impressions: 2400 },
  { name: "Wed", clicks: 2800, impressions: 1800 },
  { name: "Thu", clicks: 3800, impressions: 2800 },
  { name: "Fri", clicks: 2400, impressions: 1600 },
  { name: "Sat", clicks: 3100, impressions: 2200 },
  { name: "Sun", clicks: 2600, impressions: 1400 },
];

const todayData = [
  { name: "9AM", clicks: 800, impressions: 400 },
  { name: "12PM", clicks: 1200, impressions: 800 },
  { name: "3PM", clicks: 1500, impressions: 1000 },
  { name: "6PM", clicks: 900, impressions: 600 },
];

const monthData = [
  { name: "Week 1", clicks: 15000, impressions: 10000 },
  { name: "Week 2", clicks: 18000, impressions: 12000 },
  { name: "Week 3", clicks: 16000, impressions: 11000 },
  { name: "Week 4", clicks: 20000, impressions: 15000 },
];

export const AdsBarChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  const getData = () => {
    switch (selectedPeriod) {
      case "today":
        return todayData;
      case "week":
        return weekData;
      case "month":
        return monthData;
      default:
        return weekData;
    }
  };

  const getTotals = () => {
    const data = getData();
    return {
      clicks: data.reduce((sum, item) => sum + item.clicks, 0),
      impressions: data.reduce((sum, item) => sum + item.impressions, 0),
    };
  };

  const currentData = getData();
  const totals = getTotals();

  return (
    <div className="bg-white rounded-[24px] px-6">
      <div className="py-6 flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Ads target</h2>
        <Tabs
          value={selectedPeriod}
          onValueChange={setSelectedPeriod}
          className="w-auto"
        >
          <TabsList className="bg-gray-100">
            <TabsTrigger 
              value="today"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Today
            </TabsTrigger>
            <TabsTrigger 
              value="week"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              This week
            </TabsTrigger>
            <TabsTrigger 
              value="month"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              This month
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <div className="text-sm text-gray-500">Total clicks</div>
            <div className="text-2xl font-semibold">{totals.clicks.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Total impressions</div>
            <div className="text-2xl font-semibold">{totals.impressions.toLocaleString()}</div>
          </div>
        </div>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={currentData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="clicks" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="impressions" fill="#22C55E" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
