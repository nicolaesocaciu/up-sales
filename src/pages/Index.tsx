import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsSection } from "@/components/dashboard/StatsSection";
import { OrdersAndSalesSection } from "@/components/dashboard/OrdersAndSalesSection";
import { ProductsAndAdsSection } from "@/components/dashboard/ProductsAndAdsSection";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <Button variant="outline">Edit dashboard</Button>
        </div>

        <StatsSection />
        <OrdersAndSalesSection />
        <ProductsAndAdsSection />
      </div>
    </DashboardLayout>
  );
};

export default Index;