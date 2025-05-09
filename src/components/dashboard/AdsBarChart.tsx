import { useState } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { cn } from "@/lib/utils";
import { Grip } from "lucide-react";
const weekData = [{
  name: "Mon",
  clicks: 2100,
  impressions: 1200
}, {
  name: "Tue",
  clicks: 3200,
  impressions: 2400
}, {
  name: "Wed",
  clicks: 2800,
  impressions: 1800
}, {
  name: "Thu",
  clicks: 3800,
  impressions: 2800
}, {
  name: "Fri",
  clicks: 2400,
  impressions: 1600
}, {
  name: "Sat",
  clicks: 3100,
  impressions: 2200
}, {
  name: "Sun",
  clicks: 2600,
  impressions: 1400
}];
const todayData = [{
  name: "9AM",
  clicks: 800,
  impressions: 400
}, {
  name: "12PM",
  clicks: 1200,
  impressions: 800
}, {
  name: "3PM",
  clicks: 1500,
  impressions: 1000
}, {
  name: "6PM",
  clicks: 900,
  impressions: 600
}];
const monthData = [{
  name: "1st Week",
  clicks: 15000,
  impressions: 10000
}, {
  name: "2nd Week",
  clicks: 18000,
  impressions: 12000
}, {
  name: "3rd Week",
  clicks: 16000,
  impressions: 11000
}, {
  name: "4th Week",
  clicks: 20000,
  impressions: 15000
}];
interface AdsBarChartProps {
  isEditMode?: boolean;
}
export const AdsBarChart = ({
  isEditMode
}: AdsBarChartProps) => {
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
      impressions: data.reduce((sum, item) => sum + item.impressions, 0)
    };
  };
  const currentData = getData();
  const totals = getTotals();
  return <div className="bg-white rounded-[24px] p-6 h-full">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          {isEditMode && <div className="cursor-grab active:cursor-grabbing">
              <Grip className="h-4 w-4 text-gray-400" />
            </div>}
          <h2 className="text-lg font-semibold">Ads target</h2>
        </div>
        <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod} className="w-auto">
          <TabsList className="bg-gray-100 h-[34px]">
            <TabsTrigger value="today" className="leading-none data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Today
            </TabsTrigger>
            <TabsTrigger value="week" className="leading-none data-[state=active]:bg-white data-[state=active]:shadow-sm">
              This week
            </TabsTrigger>
            <TabsTrigger value="month" className="leading-none data-[state=active]:bg-white data-[state=active]:shadow-sm">
              This month
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="grid grid-cols-[100px_1fr] gap-8">
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-[#33C3F0]"></div>
              <div className="text-sm text-gray-500">Total clicks</div>
            </div>
            <div className="text-2xl font-semibold">{totals.clicks.toLocaleString()}</div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-[#0EA5E9]"></div>
              <div className="text-sm text-gray-500 w-[80px]">Total impressions</div>
            </div>
            <div className="text-2xl font-semibold">{totals.impressions.toLocaleString()}</div>
          </div>
        </div>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={currentData} barGap={8}>
              <XAxis dataKey="name" tickLine={false} style={{
              fontSize: '14px'
            }} />
              <YAxis tickLine={false} style={{
              fontSize: '14px'
            }} />
              <Tooltip />
              <Bar dataKey="clicks" fill="#33C3F0" stackId="stack" />
              <Bar dataKey="impressions" fill="#0EA5E9" stackId="stack" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>;
};