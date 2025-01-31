import { Button } from "../ui/button";
import { MoreHorizontal, FileText, RefreshCw, XOctagon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const OrderActionsDropdown = () => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="hover:bg-[hsla(204,35%,93%,0.5)]"
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
  );
};