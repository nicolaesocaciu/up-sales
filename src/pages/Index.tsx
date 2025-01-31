import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { OrdersTable } from "@/components/dashboard/OrdersTable";
import { ProductsTable } from "@/components/dashboard/ProductsTable";
import { SalesPieChart } from "@/components/dashboard/SalesPieChart";
import { AdsBarChart } from "@/components/dashboard/AdsBarChart";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const miniChartData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 500 },
  { name: "Apr", value: 450 },
  { name: "May", value: 470 },
  { name: "Jun", value: 480 },
];

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <Button variant="outline">Edit dashboard</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total sales"
            value="$669,112"
            change={{ value: 4, trend: "up" }}
            chart={
              <ResponsiveContainer width="100%" height={60}>
                <AreaChart data={miniChartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22C55E" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="basis"
                    dataKey="value"
                    stroke="#22C55E"
                    fillOpacity={1}
                    fill="url(#colorValue)"
                    isAnimationActive={false}
                  />
                  <YAxis hide domain={["dataMin - 100", "dataMax + 100"]} />
                  <XAxis hide />
                </AreaChart>
              </ResponsiveContainer>
            }
          />
          <StatsCard
            title="Profit"
            value="$325,998"
            change={{ value: 12, trend: "up" }}
            chart={
              <ResponsiveContainer width="100%" height={60}>
                <AreaChart data={miniChartData}>
                  <defs>
                    <linearGradient id="colorValue2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22C55E" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="natural"
                    dataKey="value"
                    stroke="#22C55E"
                    fillOpacity={1}
                    fill="url(#colorValue2)"
                    isAnimationActive={false}
                  />
                  <YAxis hide domain={["dataMin - 100", "dataMax + 100"]} />
                  <XAxis hide />
                </AreaChart>
              </ResponsiveContainer>
            }
          />
          <StatsCard
            title="Average order value"
            value="$498"
            change={{ value: 8, trend: "up" }}
            chart={
              <ResponsiveContainer width="100%" height={60}>
                <AreaChart data={miniChartData}>
                  <defs>
                    <linearGradient id="colorValue3" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22C55E" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="cardinal"
                    dataKey="value"
                    stroke="#22C55E"
                    fillOpacity={1}
                    fill="url(#colorValue3)"
                    isAnimationActive={false}
                  />
                  <YAxis hide domain={["dataMin - 100", "dataMax + 100"]} />
                  <XAxis hide />
                </AreaChart>
              </ResponsiveContainer>
            }
          />
          <StatsCard
            title="Total orders"
            value="1343"
            change={{ value: 6, trend: "down" }}
            chart={
              <ResponsiveContainer width="100%" height={60}>
                <AreaChart data={miniChartData}>
                  <defs>
                    <linearGradient id="colorValue4" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="step"
                    dataKey="value"
                    stroke="#EF4444"
                    fillOpacity={1}
                    fill="url(#colorValue4)"
                    isAnimationActive={false}
                  />
                  <YAxis hide domain={["dataMin - 100", "dataMax + 100"]} />
                  <XAxis hide />
                </AreaChart>
              </ResponsiveContainer>
            }
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <OrdersTable />
          </div>
          <div>
            <SalesPieChart />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ProductsTable />
          </div>
          <div>
            <AdsBarChart />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;