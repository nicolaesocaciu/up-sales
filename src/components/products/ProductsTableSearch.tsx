import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
interface ProductsTableSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}
export const ProductsTableSearch = ({
  searchQuery,
  onSearchChange
}: ProductsTableSearchProps) => {
  return <div className="relative min-w-[300px]">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input placeholder="Search product ..." value={searchQuery} onChange={e => onSearchChange(e.target.value)} className="pl-10 bg-white border-[#C0C0C0]" />
    </div>;
};