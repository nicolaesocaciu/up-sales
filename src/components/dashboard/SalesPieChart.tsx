import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card } from "../ui/card";

const data = [
  { name: "Website", value: 354629, color: "#3B82F6" },
  { name: "Mobile", value: 160586, color: "#22C55E" },
  { name: "Tablet", value: 107057, color: "#F59E0B" },
  { name: "Other", value: 46837, color: "#EF4444" },
];

export const SalesPieChart = () => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Sales by platform</h2>
        <select className="text-sm border rounded-md px-2 py-1">
          <option>January</option>
        </select>
      </div>
      <div className="h-[300px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-sm text-gray-500">Total</div>
          <div className="text-xl font-semibold">${total.toLocaleString()}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {data.map((item) => (
          <div key={item.name} className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <div className="flex-1 text-sm">
              <div className="font-medium">{item.name}</div>
              <div className="text-gray-500">
                ${item.value.toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};