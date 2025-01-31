import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CollapseButtonProps {
  isCollapsed: boolean;
  onClick: () => void;
}

export const CollapseButton = ({ isCollapsed, onClick }: CollapseButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="absolute -right-3 top-6 bg-white border rounded-full hover:bg-gray-100"
      onClick={onClick}
    >
      <ChevronLeft className={cn(
        "h-4 w-4 transition-transform duration-300",
        isCollapsed && "rotate-180"
      )} />
    </Button>
  );
};