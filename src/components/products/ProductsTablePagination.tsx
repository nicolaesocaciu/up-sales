
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductsTablePaginationProps {
  totalProducts: number;
  currentPageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  productsPerPage: number;
}

export const ProductsTablePagination = ({
  totalProducts,
  currentPageSize,
  currentPage,
  onPageChange,
  productsPerPage,
}: ProductsTablePaginationProps) => {
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const startRange = ((currentPage - 1) * productsPerPage) + 1;
  const endRange = Math.min(startRange + currentPageSize - 1, totalProducts);

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
    <div className="flex items-center justify-between px-4 py-4 border-t border-gray-200">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span>Showing {startRange} to {endRange} from {totalProducts}</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
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
