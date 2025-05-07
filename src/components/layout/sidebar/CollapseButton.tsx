import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
interface CollapseButtonProps {
  isCollapsed: boolean;
  onClick: () => void;
}
export const CollapseButton = ({
  isCollapsed,
  onClick
}: CollapseButtonProps) => {
  return <Button variant="ghost" size="icon" onClick={onClick} className="absolute -right-5 bottom-[32px] bg-[#F2F2F2] rounded-[8px]">
      <ChevronLeft className={cn("h-4 w-4 transition-transform duration-300", isCollapsed && "rotate-180")} />
    </Button>;
};