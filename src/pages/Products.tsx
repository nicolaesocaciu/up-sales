
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductsDataTable } from "@/components/products/ProductsDataTable";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

const Products = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-text-dark">Products</h1>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Tabs defaultValue="all-products" className="w-full">
              <TabsList className="bg-transparent border-b border-gray-200 w-full justify-start h-auto p-0 space-x-6">
                <TabsTrigger 
                  value="all-products"
                  className="px-0 py-3 h-auto data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  All products
                </TabsTrigger>
                <TabsTrigger 
                  value="featured"
                  className="px-0 py-3 h-auto data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  Featured
                </TabsTrigger>
                <TabsTrigger 
                  value="new-arrivals"
                  className="px-0 py-3 h-auto data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  New arrivals
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <ProductsDataTable />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Products;
