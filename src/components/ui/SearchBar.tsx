
import { Search } from "lucide-react";
import { Input } from "../ui/input";

export const SearchBar = () => {
  return (
    <div className="relative max-w-md w-full">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2 text-gray-400">
        <kbd className="px-1.5 py-0.5 text-xs border border-gray-500 rounded bg-gray-600 text-gray-300">⌘</kbd>
        <kbd className="px-1.5 py-0.5 text-xs border border-gray-500 rounded bg-gray-600 text-gray-300">K</kbd>
      </div>
      <Input
        style={{ backgroundColor: "#494A4A" }}
        className="pl-10 pr-20 border-0 bg-opacity-70 placeholder-gray-400 text-white focus:ring-primary"
        placeholder="Search..."
      />
    </div>
  );
};
