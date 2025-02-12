
import { ProductsTable } from "./ProductsTable";
import { AdsBarChart } from "./AdsBarChart";

interface ProductsAndAdsSectionProps {
  isEditMode?: boolean;
}

export const ProductsAndAdsSection = ({ isEditMode }: ProductsAndAdsSectionProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 h-full">
        <ProductsTable isEditMode={isEditMode} />
      </div>
      <div className="h-full">
        <AdsBarChart isEditMode={isEditMode} />
      </div>
    </div>
  );
};
