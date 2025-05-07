
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ChevronDown } from "lucide-react";

export const UserMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none flex items-center space-x-2">
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>AL</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-white">Alexander</span>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-white z-[9999] shadow-lg">
        <div className="bg-white">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="bg-white">Profile</DropdownMenuItem>
          <DropdownMenuItem className="bg-white">Settings</DropdownMenuItem>
          <DropdownMenuItem className="bg-white">Help</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-600 bg-white">Log out</DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
