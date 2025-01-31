import { OrdersTable } from "./OrdersTable";
import { SalesPieChart } from "./SalesPieChart";

export const OrdersAndSalesSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <OrdersTable />
      </div>
      <div>
        <SalesPieChart />
      </div>
    </div>
  );
};