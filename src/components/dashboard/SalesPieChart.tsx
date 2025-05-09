
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { cn } from "@/lib/utils";
import { Grip } from "lucide-react";

interface SalesPieChartProps {
  isEditMode?: boolean;
}

const data = [{
  name: "Other",
  value: 46837,
  color: "#EF4444"
}, {
  name: "Tablet",
  value: 107057,
  color: "#F59E0B"
}, {
  name: "Mobile",
  value: 160586,
  color: "#22C55E"
}, {
  name: "Website",
  value: 354629,
  color: "#3B82F6"
}];

export const SalesPieChart = ({
  isEditMode
}: SalesPieChartProps) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Configure chart colors for the shadcn chart component
  const chartConfig = {
    other: {
      color: "#EF4444"
    },
    tablet: {
      color: "#F59E0B"
    },
    mobile: {
      color: "#22C55E"
    },
    website: {
      color: "#3B82F6"
    }
  };

  return (
    <Card className="p-6 bg-white rounded-[24px] border-0 h-full shadow-none">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          {isEditMode && (
            <div className="cursor-grab active:cursor-grabbing">
              <Grip className="h-4 w-4 text-gray-400" />
            </div>
          )}
          <h2 className="text-lg font-semibold">Sales by platform</h2>
        </div>
        <Select defaultValue="january">
          <SelectTrigger className="my-0 py-0 mx-0 px-[16px] h-[30px] rounded-lg border-[#8A8A8A] bg-white text-text-dark w-[136px]">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            {months.map((month) => (
              <SelectItem key={month.toLowerCase()} value={month.toLowerCase()}>
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="h-[260px] relative mb-6">
        <ChartContainer config={chartConfig} className="h-full">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={4} dataKey="value" startAngle={-270} endAngle={90}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <ChartTooltip content={<CustomTooltipContent />} />
          </PieChart>
        </ChartContainer>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-gray-500">Total</div>
          <div className="text-2xl font-semibold">${total.toLocaleString()}</div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-x-4">
        {data.map(item => <div key={item.name} className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <div className="w-[6px] h-[38px] rounded-[4px]" style={{
            backgroundColor: item.color
          }} />
              <div>
                <div className="text-sm text-gray-500">{item.name}</div>
                <div className="text-base font-semibold">
                  ${item.value.toLocaleString()}
                </div>
              </div>
            </div>
          </div>)}
      </div>
    </Card>
  );
};

// Custom tooltip component
const CustomTooltipContent = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0]?.payload;
    const total = 669109; // Total from the data
    const percentage = (data.value / total * 100).toFixed(0);
    
    return (
      <div className="bg-[#1F2228] px-3 py-2 rounded">
        <p className="text-white">{`${data.name} - ${percentage}%`}</p>
        <p className="text-white">${data.value.toLocaleString()}</p>
      </div>
    );
  }
  
  return null;
};
