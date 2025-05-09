
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DiscountsTablePaginationProps {
  totalDiscounts: number;
  currentPageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  discountsPerPage: number;
  onDiscountsPerPageChange: (value: string) => void;
}

export const DiscountsTablePagination = ({
  totalDiscounts,
  currentPageSize,
  currentPage,
  onPageChange,
  discountsPerPage,
  onDiscountsPerPageChange,
}: DiscountsTablePaginationProps) => {
  const totalPages = Math.ceil(totalDiscounts / discountsPerPage);
  const startRange = ((currentPage - 1) * discountsPerPage) + 1;
  const endRange = Math.min(startRange + currentPageSize - 1, totalDiscounts);

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
        <span>Result {startRange}-{endRange} of {totalDiscounts}</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            className="my-0 py-0 mx-0 px-[8px] h-[30px] rounded-lg border-[#8A8A8A] bg-white text-text-dark flex items-center gap-1"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              className="my-0 py-0 mx-0 px-[16px] h-[30px] rounded-lg border-[#8A8A8A] bg-white text-text-dark flex items-center gap-1 bg-primary text-white border-primary hover:bg-primary hover:text-white"
            >
              {currentPage}
            </Button>
            <span className="text-sm text-gray-500">of {totalPages}</span>
          </div>
          <Button 
            variant="outline" 
            className="my-0 py-0 mx-0 px-[8px] h-[30px] rounded-lg border-[#8A8A8A] bg-white text-text-dark flex items-center gap-1"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Select defaultValue={discountsPerPage.toString()} onValueChange={onDiscountsPerPageChange}>
          <SelectTrigger className="my-0 py-0 mx-0 pr-[10px] pl-[16px] h-[30px] rounded-lg border-[#8A8A8A] bg-white text-text-dark w-[72px]">
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
