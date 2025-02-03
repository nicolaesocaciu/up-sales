import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, Search, Columns } from "lucide-react";
import { OrdersDataTable } from "@/components/orders/OrdersDataTable";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useState } from "react";
import { FulfillmentStatus } from "@/types/order";

const Orders = () => {
  const [selectedTab, setSelectedTab] = useState<FulfillmentStatus | 'all-orders'>('all-orders');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-text-dark">Orders</h1>
        </div>

        <div className="bg-white rounded-[24px] p-6 space-y-4">
          <div className="flex justify-between items-center">
            <Tabs 
              value={selectedTab} 
              onValueChange={(value) => setSelectedTab(value as FulfillmentStatus | 'all-orders')}
              className="w-full"
            >
              <TabsList className="bg-transparent border-b border-gray-200 w-full justify-start h-auto p-0 space-x-6">
                <TabsTrigger 
                  value="all-orders"
                  className="px-0 py-3 h-auto data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  All orders
                </TabsTrigger>
                <TabsTrigger 
                  value="Unfulfilled"
                  className="px-0 py-3 h-auto data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  Unfulfilled
                </TabsTrigger>
                <TabsTrigger 
                  value="Unpaid"
                  className="px-0 py-3 h-auto data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  Unpaid
                </TabsTrigger>
                <TabsTrigger 
                  value="Open"
                  className="px-0 py-3 h-auto data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  Open
                </TabsTrigger>
                <TabsTrigger 
                  value="Closed"
                  className="px-0 py-3 h-auto data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  Closed
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-2">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Search order ..." 
                  className="pl-10 bg-white border-gray-200"
                />
              </div>
              <Button variant="outline" size="sm" className="h-9">
                <Columns className="h-4 w-4 mr-2" />
                Columns
              </Button>
            </div>
          </div>

          <OrdersDataTable selectedTab={selectedTab} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Orders;