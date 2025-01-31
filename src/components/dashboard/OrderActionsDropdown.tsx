import { Button } from "../ui/button";
import { MoreHorizontal, FileText, RefreshCw, XOctagon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState } from "react";

export const OrderActionsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <DropdownMenu modal={false} open={isOpen}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon"
            className="hover:bg-[rgba(153,203,236,0.50)]"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px] p-2 rounded-xl bg-white">
          <DropdownMenuItem className="flex items-center gap-2 px-4 py-3 text-sm cursor-pointer hover:bg-[#F5F5F5] rounded-lg">
            <FileText className="h-5 w-5" />
            View order
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 px-4 py-3 text-sm cursor-pointer hover:bg-[#F5F5F5] rounded-lg">
            <RefreshCw className="h-5 w-5" />
            Change status
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 px-4 py-3 text-sm cursor-pointer hover:bg-[#F5F5F5] rounded-lg text-red-600 hover:text-red-600">
            <XOctagon className="h-5 w-5" />
            Cancel order
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};