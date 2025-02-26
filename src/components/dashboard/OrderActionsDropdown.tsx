
import { Button } from "../ui/button";
import { FileText, RefreshCw, XOctagon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface OrderActionsDropdownProps {
  onOpenChange?: (isOpen: boolean) => void;
}

export const OrderActionsDropdown = ({ onOpenChange }: OrderActionsDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    onOpenChange?.(open);
  };

  return (
    <div className="text-center relative bg-white">
      <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon"
            className={cn(
              "transition-colors bg-white",
              isOpen ? "bg-[rgba(153,203,236,0.50)]" : "hover:bg-[rgba(153,203,236,0.50)]"
            )}
          >
            <svg width="4" height="16" viewBox="0 0 4 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4ZM2 6C0.9 6 0 6.9 0 8C0 9.1 0.9 10 2 10C3.1 10 4 9.1 4 8C4 6.9 3.1 6 2 6ZM2 12C0.9 12 0 12.9 0 14C0 15.1 0.9 16 2 16C3.1 16 4 15.1 4 14C4 12.9 3.1 12 2 12Z" fill="#494A4A"/>
            </svg>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="w-[200px] p-2 rounded-xl bg-white z-[9999] shadow-lg" 
          sideOffset={-10}
        >
          <div className="bg-white rounded-xl">
            <DropdownMenuItem className="flex items-center gap-2 px-4 py-3 text-sm cursor-pointer hover:bg-[#E7F2F9] rounded-lg bg-white">
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
