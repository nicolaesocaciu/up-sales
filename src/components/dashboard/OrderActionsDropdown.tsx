
import { Button } from "../ui/button";
import { FileText, RefreshCw, XOctagon, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface OrderActionsDropdownProps {
  onOpenChange?: (isOpen: boolean) => void;
  onViewOrder?: () => void;
}

export const OrderActionsDropdown = ({
  onOpenChange,
  onViewOrder
}: OrderActionsDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    onOpenChange?.(open);
  };

  const handleViewOrder = () => {
    setIsOpen(false); // Close dropdown when clicking view order
    onViewOrder?.();
  };

  return (
    <div className="text-center relative">
      <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn(
              "transition-colors", 
              isOpen ? "bg-[rgba(153,203,236,0.50)]" : "hover:bg-[rgba(153,203,236,0.50)]"
            )}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px] p-2 rounded-xl bg-white z-[9999] shadow-lg" sideOffset={-10}>
          <div className="bg-white rounded-xl">
            <DropdownMenuItem 
              className="flex items-center gap-2 px-4 py-3 text-sm cursor-pointer hover:bg-[#E7F2F9] rounded-lg bg-white"
              onClick={handleViewOrder}
            >
              <FileText className="h-5 w-5" />
              View order
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 px-4 py-3 text-sm cursor-pointer hover:bg-[#E7F2F9] rounded-lg bg-white">
              <RefreshCw className="h-5 w-5" />
              Change status
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 px-4 py-3 text-sm cursor-pointer hover:bg-[#E7F2F9] rounded-lg text-red-600 hover:text-red-600 bg-white">
              <XOctagon className="h-5 w-5" />
              Cancel order
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
