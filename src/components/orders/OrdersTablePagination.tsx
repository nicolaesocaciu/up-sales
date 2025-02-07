
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
  currentPage: number;
  onPageChange: (page: number) => void;
  ordersPerPage: number;
}

export const OrdersTablePagination = ({
  totalOrders,
  currentPageSize,
  currentPage,
  onPageChange,
  ordersPerPage,
}: OrdersTablePaginationProps) => {
  const totalPages = Math.ceil(totalOrders / ordersPerPage);
  const startRange = ((currentPage - 1) * ordersPerPage) + 1;
  const endRange = Math.min(startRange + currentPageSize - 1, totalOrders);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-4">
      <div className="text-sm text-gray-500">
        <span>Showing {startRange} to {endRange} from {totalOrders}</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 w-8 p-0"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 bg-primary text-white border-primary hover:bg-primary hover:text-white"
            >
              {currentPage}
            </Button>
            <span className="text-sm text-gray-500">of {totalPages}</span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 w-8 p-0"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Select defaultValue="10">
          <SelectTrigger className="w-[70px] h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white">
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
