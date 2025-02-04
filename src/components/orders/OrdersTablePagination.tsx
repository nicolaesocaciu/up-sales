import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OrdersTablePaginationProps {
  totalOrders: number;
  currentPageSize: number;
}

export const OrdersTablePagination = ({
  totalOrders,
  currentPageSize,
}: OrdersTablePaginationProps) => {
  return (
    <div className="flex items-center justify-between px-4 py-4 border-t border-gray-200">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span>Showing 1 to {currentPageSize} from {totalOrders}</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 bg-primary text-white border-primary hover:bg-primary hover:text-white"
            >
              1
            </Button>
            <span className="text-sm text-gray-500">of 1</span>
          </div>
          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Select defaultValue="50">
          <SelectTrigger className="w-[70px] h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};