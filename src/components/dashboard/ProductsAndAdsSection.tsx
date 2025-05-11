
import { ProductsTable } from "./ProductsTable";
import { AdsBarChart } from "./AdsBarChart";
import { DragDotsIcon } from "../ui/icons/DragDotsIcon";

interface ProductsAndAdsSectionProps {
  isEditMode?: boolean;
}

export const ProductsAndAdsSection = ({ isEditMode }: ProductsAndAdsSectionProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 h-full group relative">
        {isEditMode && (
          <div className="absolute left-6 top-6 cursor-grab active:cursor-grabbing z-10">
            <DragDotsIcon className="h-5 w-5 text-[#494A4A] ml-[-20px] mt-[3px]" />
          </div>
        )}
        <div className={isEditMode ? "cursor-grab active:cursor-grabbing" : ""}>
          <ProductsTable isEditMode={isEditMode} />
        </div>
      </div>
      <div className="h-full">
        <AdsBarChart isEditMode={isEditMode} />
      </div>
    </div>
  );
};
