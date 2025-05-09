
import { Cell, Pie, PieChart } from "recharts";
import { Card } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { Grip } from "lucide-react";

interface SalesPieChartProps {
  isEditMode?: boolean;
}

const data = [{
  name: "Other",
  value: 46837
}, {
  name: "Tablet",
  value: 107057
}, {
  name: "Mobile",
  value: 160586
}, {
  name: "Website",
  value: 354629
}];

export const SalesPieChart = ({
  isEditMode
}: SalesPieChartProps) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Using default shadcn chart config
  const chartConfig = {
    other: { label: "Other" },
    tablet: { label: "Tablet" },
    mobile: { label: "Mobile" },
    website: { label: "Website" }
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
            <Pie 
              data={data} 
              cx="50%" 
              cy="50%" 
              innerRadius={70} 
              outerRadius={100} 
              paddingAngle={4} 
              dataKey="value" 
              nameKey="name"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent />} />
          </PieChart>
        </ChartContainer>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-gray-500">Total</div>
          <div className="text-2xl font-semibold">${total.toLocaleString()}</div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-x-4">
        {Object.entries(chartConfig).map(([key, config]) => {
          const item = data.find(d => d.name.toLowerCase() === key);
          if (!item) return null;
          
          return (
            <div key={key} className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <div className="w-[6px] h-[38px] rounded-[4px]" />
                <div>
                  <div className="text-sm text-gray-500">{config.label}</div>
                  <div className="text-base font-semibold">
                    ${item.value.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
