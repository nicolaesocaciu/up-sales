
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Eye, Pencil, Trash2, MoreHorizontal } from "lucide-react";
import { Order } from "@/types/order";
import { useState } from "react";

interface OrderTableActionsProps {
  order: Order;
  onView: () => void;
  onDelete: () => void;
}

export const OrderTableActions = ({ 
  order, 
  onView, 
  onDelete 
}: OrderTableActionsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleView = () => {
    setIsOpen(false); // Close dropdown when viewing
    onView();
  };

  const handleDelete = () => {
    setIsOpen(false); // Close dropdown when deleting
    onDelete();
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className={`transition-colors ${isOpen ? 'bg-[rgba(153,203,236,0.50)]' : 'hover:bg-[rgba(153,203,236,0.50)]'}`}
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px] p-2 rounded-xl bg-white" sideOffset={-10}>
        <DropdownMenuItem 
          className="flex items-center gap-2 px-4 py-3 text-sm cursor-pointer hover:bg-[#E7F2F9] rounded-lg"
          onClick={handleView}
        >
          <Eye className="h-5 w-5" />
          View order
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 px-4 py-3 text-sm cursor-pointer hover:bg-[#E7F2F9] rounded-lg">
          <Pencil className="h-5 w-5" />
          Edit order
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="flex items-center gap-2 px-4 py-3 text-sm cursor-pointer hover:bg-[#E7F2F9] rounded-lg text-red-600 hover:text-red-600"
          onClick={handleDelete}
        >
          <Trash2 className="h-5 w-5" />
          Delete order
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
