import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const data = [
  { name: "Website", value: 354629, color: "#3B82F6" },
  { name: "Mobile", value: 160586, color: "#22C55E" },
  { name: "Tablet", value: 107057, color: "#F59E0B" },
  { name: "Other", value: 46837, color: "#EF4444" },
];

export const SalesPieChart = () => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="p-6 bg-white rounded-[24px] border-0">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg font-semibold">Sales by platform</h2>
        <Select defaultValue="january">
          <SelectTrigger className="w-[140px] border rounded-full">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="january">January</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="h-[300px] relative mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={4}
              dataKey="value"
              startAngle={-90}
              endAngle={270}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2228',
                border: 'none',
                padding: '0 12px',
                borderRadius: '4px',
                zIndex: 50
              }}
              itemStyle={{ color: '#FFFFFF' }}
              labelStyle={{ color: '#FFFFFF' }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-sm text-gray-500">Total</div>
          <div className="text-2xl font-semibold">${total.toLocaleString()}</div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-x-4">
        {data.map((item) => (
          <div key={item.name} className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <div 
                className="w-1 h-12" 
                style={{ backgroundColor: item.color }}
              />
              <div>
                <div className="font-medium text-sm">{item.name}</div>
                <div className="text-base font-semibold">
                  ${item.value.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};