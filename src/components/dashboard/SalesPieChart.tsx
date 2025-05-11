
import { Cell, Pie, PieChart } from "recharts";
import { Card } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "../ui/chart";
import { DragDotsIcon } from "../ui/icons/DragDotsIcon";

interface SalesPieChartProps {
  isEditMode?: boolean;
}

const data = [
  {
    name: "Website",
    value: 354629,
    color: " #419BD7"
  },
  {
    name: "Mobile",
    value: 160586,
    color: " #7FAF7F"
  },
  {
    name: "Tablet",
    value: 107057,
    color: " #EDB45F"
  },
  {
    name: "Other",
    value: 46837,
    color: " #E28594"
  }
];

export const SalesPieChart = ({ isEditMode }: SalesPieChartProps) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  // Configure chart colors with the Sapphire color scheme
  const chartConfig = {
    website: {
      label: "Website",
      color: " #419BD7" // Sapphire darker
    },
    mobile: {
      label: "Mobile",
      color: " #7FAF7F" // Sapphire
    },
    tablet: {
      label: "Tablet",
      color: " #EDB45F" // Ruby lighter
    },
    other: {
      label: "Other",
      color: " #E28594" // Ruby
    }
  };

  return (
    <Card className="p-6 bg-white rounded-[24px] border-0 shadow-none h-full relative group">
      <div className="flex items-center justify-between mb-6 relative">
        <div className={`flex items-center ${isEditMode ? "cursor-grab active:cursor-grabbing" : ""}`}>
          {isEditMode && (
              <DragDotsIcon className="h-5 w-5 text-[#494A4A] ml-[-20px] mt-[-1px] absolute" />
          )}
          <h2 className="text-lg font-semibold">Sales by platform</h2>
        </div>
        <Select defaultValue="january">
          <SelectTrigger className="my-0 py-0 mx-0 px-[16px] h-[30px] rounded-lg border-[#8A8A8A] bg-white text-[#252626] w-[136px]">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            {months.map(month => (
              <SelectItem key={month.toLowerCase()} value={month.toLowerCase()}>
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="relative">
        <ChartContainer config={chartConfig} className="h-full">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={4} dataKey="value" startAngle={-270} endAngle={90} nameKey="name">
              {data.map((entry, index) => {
              const key = entry.name.toLowerCase();
              return <Cell key={`cell-${index}`} fill={chartConfig[key as keyof typeof chartConfig]?.color || entry.color} />;
            })}
            </Pie>
            <ChartTooltip content={<CustomTooltipContent />} />
          </PieChart>
        </ChartContainer>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-[#494A4A]">Total</div>
          <div className="text-2xl font-semibold">${total.toLocaleString()}</div>
        </div>
      </div>
      <div className="grid grid-cols-[90px_90px_90px_90px] gap-5 pt-6 justify-self-center">
        {Object.entries(chartConfig).map(([key, config]) => {
        const item = data.find(d => d.name.toLowerCase() === key);
        if (!item) return null;
        return <div key={key} className="flex items-center  w-[90px]">
              <div className="flex items-center space-x-2">
                <div className="w-[6px] h-[38px] rounded-[4px]" style={{
              backgroundColor: config.color
            }} />
                <div>
                  <div className="text-sm text-[#494A4A]">{config.label}</div>
                  <div className="text-base font-semibold">
                    ${item.value.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>;
      })}
      </div>
    </Card>
  );
};

// Custom tooltip component
const CustomTooltipContent = ({
  active,
  payload
}: any) => {
  if (active && payload && payload.length) {
    const data = payload[0]?.payload;
    const total = 669109; // Total from the data
    const percentage = (data.value / total * 100).toFixed(0);
    return <div className="bg-[#1F2228] px-3 py-2 rounded">
        <p className="text-white">{`${data.name} - ${percentage}%`}</p>
        <p className="text-white">${data.value.toLocaleString()}</p>
      </div>;
  }
  return null;
};
