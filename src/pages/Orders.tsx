import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Filter, Columns } from "lucide-react";
import { OrdersDataTable } from "@/components/orders/OrdersDataTable";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SearchBar } from "@/components/ui/SearchBar";
import { FulfillmentStatus } from "@/types/order";

const Orders = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-text-dark">Orders</h1>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Tabs defaultValue="all-orders" className="w-full">
              <div className="flex items-center justify-between">
                <TabsList className="bg-transparent border-b border-gray-200 w-auto justify-start h-auto p-0 space-x-6">
                  <TabsTrigger 
                    value="all-orders"
                    className="px-0 py-3 h-auto data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                  >
                    All orders
                  </TabsTrigger>
                  <TabsTrigger 
                    value="fulfilled"
                    className="px-0 py-3 h-auto data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                  >
                    Fulfilled
                  </TabsTrigger>
                  <TabsTrigger 
                    value="unpaid"
                    className="px-0 py-3 h-auto data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                  >
                    Unpaid
                  </TabsTrigger>
                  <TabsTrigger 
                    value="open"
                    className="px-0 py-3 h-auto data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                  >
                    Open
                  </TabsTrigger>
                  <TabsTrigger 
                    value="closed"
                    className="px-0 py-3 h-auto data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                  >
                    Closed
                  </TabsTrigger>
                </TabsList>
                <SearchBar />
              </div>

              <TabsContent value="all-orders">
                <OrdersDataTable filterStatus={null} />
              </TabsContent>
              <TabsContent value="fulfilled">
                <OrdersDataTable filterStatus="Fulfilled" />
              </TabsContent>
              <TabsContent value="unpaid">
                <OrdersDataTable filterStatus="Unpaid" />
              </TabsContent>
              <TabsContent value="open">
                <OrdersDataTable filterStatus="Open" />
              </TabsContent>
              <TabsContent value="closed">
                <OrdersDataTable filterStatus="Closed" />
              </TabsContent>
            </Tabs>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-9">
              <Filter className="h-4 w-4 mr-2" />
              Add filter
            </Button>
            <Button variant="outline" size="sm" className="h-9">
              <Columns className="h-4 w-4 mr-2" />
              Columns
            </Button>
          </div>

          <div className="bg-white rounded-xl border border-gray-200">
            <OrdersDataTable filterStatus={null} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Orders;