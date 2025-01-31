import { ProductsTable } from "./ProductsTable";
import { AdsBarChart } from "./AdsBarChart";

export const ProductsAndAdsSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <ProductsTable />
      </div>
      <div>
        <AdsBarChart />
      </div>
    </div>
  );
};