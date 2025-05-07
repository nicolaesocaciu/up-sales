
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
          <Avatar className="h-[28px] w-[28px]">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>Alexander</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-white">Alexander</span>
          <ChevronDown className="h-4 w-4 text-white" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-white z-[9999] shadow-lg">
        <div className="bg-white">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="bg-white">Profile</DropdownMenuItem>
          <DropdownMenuItem className="bg-white">Settings</DropdownMenuItem>
          <DropdownMenuItem className="bg-white">Help</DropdownMenuItem>
          <DropdownMenuSeparator className="bg-[#DADADA] mx-[16px]"/>
          <DropdownMenuItem className="bg-white">Log out</DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
