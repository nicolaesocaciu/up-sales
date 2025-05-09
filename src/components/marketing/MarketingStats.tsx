
import { StatsCard } from "@/components/dashboard/StatsCard";
import { LineChart, Line } from "recharts";

// Sample data for the charts
const leadGenerationData = [
  { value: 1200 },
  { value: 1350 },
  { value: 1400 },
  { value: 1300 },
  { value: 1500 },
  { value: 1700 },
  { value: 1600 },
  { value: 1800 },
  { value: 2000 },
  { value: 2245 }
];

const salesConversionData = [
  { value: 500 },
  { value: 480 },
  { value: 470 },
  { value: 450 },
  { value: 430 },
  { value: 420 },
  { value: 410 },
  { value: 400 },
  { value: 395 },
  { value: 393 }
];

const engagementData = [
  { value: 5000 },
  { value: 5500 },
  { value: 6000 },
  { value: 6500 },
  { value: 7000 },
  { value: 7200 },
  { value: 7800 },
  { value: 8200 },
  { value: 8500 },
  { value: 9026 }
];

export const MarketingStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatsCard
        title="Lead generation"
        value="2,245"
        change={{ value: 28, trend: "up" }}
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
      
      <div className="text-sm text-gray-500 col-span-1 md:col-span-3">
        <div className="flex items-center gap-2">
          <span>from 987 (last 30 days)</span>
          <span className="mx-4">from 568 (last 30 days)</span>
          <span>from 2,873 (last 30 days)</span>
        </div>
      </div>
    </div>
  );
};
