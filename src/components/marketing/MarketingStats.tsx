
import { StatsCard } from "@/components/dashboard/StatsCard";
import { LineChart, Line } from "recharts";
import { useMemo } from "react";

// Function to generate random chart data with a trend
const generateChartData = (points: number, trend: "up" | "down", minValue: number, maxValue: number) => {
  const data = [];
  const range = maxValue - minValue;
  const step = range / points;
  
  // Generate baseline data
  let value = trend === "up" ? minValue : maxValue;
  
  for (let i = 0; i < points; i++) {
    // Add some randomness but maintain the general trend
    const randomVariation = Math.random() * (step * 0.8);
    
    if (trend === "up") {
      value = value + (step * 0.5) + randomVariation;
    } else {
      value = value - (step * 0.5) - randomVariation;
    }
    
    // Ensure we stay within our min/max bounds
    value = Math.max(minValue, Math.min(maxValue, value));
    data.push({ value: Math.round(value) });
  }
  
  return data;
};

export const MarketingStats = () => {
  // Generate random chart data based on the trend (up/down)
  const leadGenerationData = useMemo(() => 
    generateChartData(10, "up", 1000, 2300), []);
  
  const salesConversionData = useMemo(() => 
    generateChartData(10, "down", 390, 600), []);
  
  const engagementData = useMemo(() => 
    generateChartData(10, "up", 5000, 9100), []);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatsCard
        title="Lead generation"
        value="2,245"
        change={{ value: 28, trend: "up" }}
        compareText="from 987 (last 30 days)"
        chart={
          <LineChart width={300} height={30} data={leadGenerationData}>
            <Line
              type="monotone"
              dataKey="value"
              stroke="#4ade80"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        }
      />
      
      <StatsCard
        title="Sales Conversion"
        value="393"
        change={{ value: 12, trend: "down" }}
        compareText="from 568 (last 30 days)"
        chart={
          <LineChart width={300} height={30} data={salesConversionData}>
            <Line
              type="monotone"
              dataKey="value"
              stroke="#ef4444"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        }
      />
      
      <StatsCard
        title="Engagement"
        value="9,026"
        change={{ value: 67, trend: "up" }}
        compareText="from 2,873 (last 30 days)"
        chart={
          <LineChart width={300} height={30} data={engagementData}>
            <Line
              type="monotone"
              dataKey="value"
              stroke="#4ade80"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        }
      />
    </div>
  );
};
