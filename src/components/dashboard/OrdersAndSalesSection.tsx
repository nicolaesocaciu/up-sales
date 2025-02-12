
import { OrdersTable } from "./OrdersTable";
import { SalesPieChart } from "./SalesPieChart";

interface OrdersAndSalesSectionProps {
  isEditMode?: boolean;
}

export const OrdersAndSalesSection = ({ isEditMode }: OrdersAndSalesSectionProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <OrdersTable />
      </div>
      <div>
        <SalesPieChart isEditMode={isEditMode} />
      </div>
    </div>
  );
};
