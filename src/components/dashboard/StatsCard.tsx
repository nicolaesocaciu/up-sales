import { cn } from "@/lib/utils";
import { Card } from "../ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  change: {
    value: number;
    trend: "up" | "down";
  };
  chart?: React.ReactNode;
}

export const StatsCard = ({ title, value, change, chart }: StatsCardProps) => {
  return (
    <Card className="p-6">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-text-light">{title}</h3>
        <div className="flex items-baseline justify-between">
          <p className="text-2xl font-semibold text-text-dark">{value}</p>
          <div className="flex items-center space-x-1">
            <span
              className={cn(
                "text-sm font-medium",
                change.trend === "up" ? "text-green-600" : "text-red-600"
              )}
            >
              {change.trend === "up" ? "+" : "-"}
              {Math.abs(change.value)}%
            </span>
          </div>
        </div>
      </div>
      {chart && <div className="mt-4">{chart}</div>}
    </Card>
  );
};