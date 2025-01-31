import { Search } from "lucide-react";
import { Input } from "../ui/input";

export const SearchBar = () => {
  return (
    <div className="relative max-w-md w-full">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        className="pl-10 bg-white border-gray-200 focus:border-primary focus:ring-primary"
        placeholder="Search..."
      />
    </div>
  );
};