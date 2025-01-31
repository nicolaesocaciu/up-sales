import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

const data = [
  { name: "Mon", clicks: 2100, impressions: 1200 },
  { name: "Tue", clicks: 3200, impressions: 2400 },
  { name: "Wed", clicks: 2800, impressions: 1800 },
  { name: "Thu", clicks: 3800, impressions: 2800 },
  { name: "Fri", clicks: 2400, impressions: 1600 },
  { name: "Sat", clicks: 3100, impressions: 2200 },
  { name: "Sun", clicks: 2600, impressions: 1400 },
];

export const AdsBarChart = () => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Ads target</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            Today
          </Button>
          <Button variant="outline" size="sm">
            This week
          </Button>
          <Button variant="outline" size="sm">
            This month
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <div className="text-sm text-gray-500">Total clicks</div>
          <div className="text-2xl font-semibold">4200</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Total impressions</div>
          <div className="text-2xl font-semibold">2320</div>
        </div>
      </div>
      <div className="h-[200px] mt-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="clicks" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="impressions" fill="#22C55E" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};