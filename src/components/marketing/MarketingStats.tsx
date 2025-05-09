
import { StatsCard } from "@/components/dashboard/StatsCard";
import { LineChart, Line } from "recharts";
import { useEffect, useState } from "react";

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
  // Use state instead of useMemo to ensure new data on each render
  const [chartData, setChartData] = useState({
    leadGeneration: [] as { value: number }[],
    salesConversion: [] as { value: number }[],
    engagement: [] as { value: number }[],
    generatedIncome: [] as { value: number }[]
  });
  
  // Generate new chart data every 5 seconds
  useEffect(() => {
    // Generate initial data
    generateNewChartData();
    
    // Set up interval to regenerate data
    const intervalId = setInterval(() => {
      generateNewChartData();
    }, 5000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  
  // Function to generate new chart data
  const generateNewChartData = () => {
    console.log("Generating new chart data");
    setChartData({
      leadGeneration: generateChartData(10, "up", 1000, 2300),
      salesConversion: generateChartData(10, "down", 390, 600),
      engagement: generateChartData(10, "up", 5000, 9100),
      generatedIncome: generateChartData(10, "up", 8000, 12000)
    });
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatsCard
        title="Lead generation"
        value="2,245"
        change={{ value: 28, trend: "up" }}
        compareText="from 987 (last 30 days)"
        chart={
          <LineChart width={300} height={30} data={chartData.leadGeneration}>
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
          <LineChart width={300} height={30} data={chartData.salesConversion}>
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
          <LineChart width={300} height={30} data={chartData.engagement}>
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
        title="Generated income"
        value="$ 9,862"
        change={{ value: 13, trend: "up" }}
        compareText="from $8,728 (last 30 days)"
        chart={
          <LineChart width={300} height={30} data={chartData.generatedIncome}>
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
