
import { cn } from "@/lib/utils";
import { Card } from "../ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
interface StatsCardProps {
  title: string;
  value: string | number;
  change: {
    value: number;
    trend: "up" | "down";
  };
  compareText?: string;
  chart?: React.ReactNode;
}
export const StatsCard = ({
  title,
  value,
  change,
  compareText,
  chart
}: StatsCardProps) => {
  return <Card className="p-6 bg-white rounded-[24px] border-0 shadow-none relative">
      {chart && <div className="absolute top-6 right-6 w-[160px] h-8 overflow-hidden opacity-80 [&_svg]:!stroke-[3] [&_svg]:!h-8 [&_.recharts-surface]:!w-[90px] [&_.recharts-surface]:!float-right">
          {chart}
        </div>}
      <div className="flex flex-col gap-8">
        <h3 className="font-regular text-gray-500">{title}</h3>
        <div className="flex flex-col gap-1">
          <div className="flex items-baseline justify-between">
            <p className="text-2xl font-semibold text-text-dark">{value}</p>
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger>
                  <div className={cn("px-2 py-1 rounded-full text-sm font-medium", change.trend === "up" ? "bg-status-light-up text-green-600" : "bg-status-light-down text-red-600")}>
                    {change.trend === "up" ? "+" : "-"}
                    {Math.abs(change.value)}%
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-[#1F2228] text-white border-0">
                  <p>Compared with the previous month</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          {compareText && (
            <p className="text-sm text-gray-500">{compareText}</p>
          )}
        </div>
      </div>
    </Card>;
};
