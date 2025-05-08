
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface OrdersTableSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function OrdersTableSearch({ searchQuery, onSearchChange }: OrdersTableSearchProps) {
  return (
    <div className="relative min-w-[300px]">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input 
        placeholder="Search order ..." 
        className="pl-10 bg-white border-gray-200"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}
