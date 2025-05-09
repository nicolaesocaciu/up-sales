
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Eye, Pencil, Trash2 } from "lucide-react";
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
          <svg width="4" height="16" viewBox="0 0 4 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4ZM2 6C0.9 6 0 6.9 0 8C0 9.1 0.9 10 2 10C3.1 10 4 9.1 4 8C4 6.9 3.1 6 2 6ZM2 12C0.9 12 0 12.9 0 14C0 15.1 0.9 16 2 16C3.1 16 4 15.1 4 14C4 12.9 3.1 12 2 12Z" fill="#494A4A"/>
          </svg>
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
