
import { cn } from "@/lib/utils";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
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
      {chart && <div className="absolute top-6 right-6 overflow-hidden opacity-80">
          {chart}
        </div>}
      <div className="flex flex-col gap-6">
        <h3 className="font-regular text-[#494A4A]">{title}</h3>
        <div className="flex flex-col gap-1">
          <div className="flex items-baseline justify-between">
            <p className="text-2xl font-semibold text-[#252626]">{value}</p>
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger>
                  <Badge 
                    className={cn(
                      "rounded-[4px] py-[4px] px-[12px]",
                      change.trend === "up" ? "border-[#9BC29B] bg-[#CFE7CF] text-[#2D7048]" : 
                      "border-[#F1BDC4] bg-[#FAD9DE] text-[#CC334C]"
                    )}
                  >
                    {change.trend === "up" ? "+" : "-"}
                    {Math.abs(change.value)}%
                  </Badge>
                </TooltipTrigger>
                <TooltipContent className="bg-[#1F2228] text-white border-0">
                  <p>Compared with the previous month</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          {compareText && <p className="text-sm text-[#494A4A]">{compareText}</p>}
        </div>
      </div>
    </Card>;
};
