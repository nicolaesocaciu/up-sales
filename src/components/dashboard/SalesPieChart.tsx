import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card } from "../ui/card";

const data = [
  { name: "Website", value: 354629, color: "#3B82F6" },
  { name: "Mobile", value: 160586, color: "#84B195" },
  { name: "Tablet", value: 107057, color: "#E5B171" },
  { name: "Other", value: 46837, color: "#E4A5A5" },
];

export const SalesPieChart = () => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="p-6 bg-white rounded-3xl">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold text-[#252626]">Sales by platform</h2>
        <select className="text-lg border rounded-2xl px-6 py-2 bg-white text-[#252626] appearance-none cursor-pointer hover:bg-gray-50 transition-colors">
          <option>January</option>
        </select>
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
              strokeWidth={0}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => `$${value.toLocaleString()}`}
              contentStyle={{
                backgroundColor: 'white',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-lg text-gray-500 mb-1">Total</div>
          <div className="text-3xl font-semibold">${total.toLocaleString()}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-8 gap-y-6">
        {data.map((item) => (
          <div key={item.name} className="flex items-center space-x-3">
            <div
              className="w-4 h-4 rounded-sm"
              style={{ backgroundColor: item.color }}
            />
            <div className="flex-1">
              <div className="text-lg font-medium text-[#252626]">{item.name}</div>
              <div className="text-lg text-[#494A4A]">
                ${item.value.toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};