import { Bell, ChevronDown } from "lucide-react";
import { SearchBar } from "../ui/SearchBar";
import { UserMenu } from "../ui/UserMenu";
import { Button } from "../ui/button";
export const TopBar = () => {
  return <div className="fixed top-0 left-0 right-0 z-50 h-16 bg-white flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <span className="text-lg font-semibold">Zipo sales</span>
      </div>
      <SearchBar />
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5 text-gray-500" />
        </Button>
        <UserMenu />
      </div>
    </div>;
};