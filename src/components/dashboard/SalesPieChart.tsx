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
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold text-text-dark">Sales by platform</h2>
        <select className="px-4 py-2 border rounded-lg text-base bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
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
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  strokeWidth={0}
                />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => `$${value.toLocaleString()}`}
              contentStyle={{
                backgroundColor: 'white',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                padding: '8px 12px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-sm text-gray-500 mb-1">Total</div>
          <div className="text-2xl font-semibold text-text-dark">${total.toLocaleString()}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-8 gap-y-6">
        {data.map((item) => (
          <div key={item.name} className="flex items-center space-x-3">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: item.color }}
            />
            <div className="flex-1">
              <div className="text-base font-medium text-text-dark">{item.name}</div>
              <div className="text-base text-text-dark">
                ${item.value.toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};