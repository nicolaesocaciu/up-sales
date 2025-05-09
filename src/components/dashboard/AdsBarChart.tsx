
import { useState } from "react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "../ui/chart";
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

  // Define chart config with Sapphire color scheme
  const chartConfig = {
    clicks: {
      label: "Clicks",
      color: "#3b82f6" // Sapphire
    },
    impressions: {
      label: "Impressions",
      color: "#93c5fd" // Sapphire lighter
    }
  };
  return <div className="bg-white rounded-[24px] p-6 h-full">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          {isEditMode && <div className="cursor-grab active:cursor-grabbing">
              <Grip className="h-4 w-4 text-[#494A4A]" />
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
      <div className="grid gap-4">
        <div className="flex items-center">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm" style={{
              backgroundColor: chartConfig.clicks.color
            }}></div>
              <div className="text-sm text-[#494A4A]">Total clicks</div>
            </div>
            <div className="text-2xl font-semibold ml-5">{totals.clicks.toLocaleString()}</div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <div style={{
              backgroundColor: chartConfig.impressions.color
            }} className="w-3 h-3 rounded-sm"></div>
              <div className="text-sm text-[#494A4A]">Total impressions</div>
            </div>
            <div className="text-2xl font-semibold ml-5">{totals.impressions.toLocaleString()}</div>
          </div>
        </div>
        <div className="">
          <ChartContainer config={chartConfig} className="h-full">
            <BarChart data={currentData} barGap={0}>
              <XAxis dataKey="name" tickLine={false} style={{
              fontSize: '14px'
            }} axisLine={{
              stroke: '#E5E7EB'
            }} />
              <YAxis tickLine={false} style={{
              fontSize: '14px'
            }} axisLine={{
              stroke: '#E5E7EB'
            }} />
              {/* <ChartTooltip content={<ChartTooltipContent />} /> */}
              <Bar dataKey="impressions" fill={chartConfig.impressions.color} stackId="stack" radius={[0, 0, 0, 0]} />
              <Bar dataKey="clicks" fill={chartConfig.clicks.color} stackId="stack" radius={[4, 4, 0, 0]} />
              <ChartLegend content={<ChartLegendContent />} verticalAlign="top" align="right" />
            </BarChart>
          </ChartContainer>
        </div>
      </div>
    </div>;
};
