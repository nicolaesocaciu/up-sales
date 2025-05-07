import { Search } from "lucide-react";
import { Input } from "../ui/input";
export const SearchBar = () => {
  return <div className="relative max-w-md w-full">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white">
        <Search className="h-4 w-4 text-white" />
      </div>
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1 text-white">
        <kbd className="px-[8px] py-[4px] text-xs text-semibold rounded bg-[#252626] text-white">⌘</kbd>
        <kbd className="px-1.5 py-0.5 text-xs rounded bg-[#252626] text-white">K</kbd>
      </div>
      <Input style={{
      backgroundColor: "#494A4A"
    }} placeholder="Search..." className="pl-10 pr-20 border-0 bg-[#494A4A] placeholder-[#FFFFFF] focus:ring-primary" />
    </div>;
};