import { Bell, Settings } from "lucide-react";
import { SearchBar } from "../ui/SearchBar";
import { UserMenu } from "../ui/UserMenu";
import { Button } from "../ui/button";

export const TopBar = () => {
  return (
    <div className="h-16 border-b bg-white flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <img src="/logo.svg" alt="Logo" className="h-8" />
      </div>
      <SearchBar />
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5 text-gray-500" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5 text-gray-500" />
        </Button>
        <UserMenu />
      </div>
    </div>
  );
};