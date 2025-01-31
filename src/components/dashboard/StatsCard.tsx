import { cn } from "@/lib/utils";
import { Card } from "../ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

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
    <Card className="p-6 bg-white rounded-[24px] border-0 relative">
      {chart && (
        <div className="absolute top-6 right-6 w-24 h-8 opacity-80 [&_svg]:!stroke-[3] [&_svg]:!h-8">
          {chart}
        </div>
      )}
      <div className="flex flex-col gap-8">
        <h3 className="text-sm font-medium text-text-light">{title}</h3>
        <div className="flex items-baseline justify-between">
          <p className="text-2xl font-semibold text-text-dark">{value}</p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div
                  className={cn(
                    "px-2 py-1 rounded-full text-sm font-medium",
                    change.trend === "up"
                      ? "bg-status-light-up text-green-600"
                      : "bg-status-light-down text-red-600"
                  )}
                >
                  {change.trend === "up" ? "+" : "-"}
                  {Math.abs(change.value)}%
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Compared with the previous month</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </Card>
  );
};