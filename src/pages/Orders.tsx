import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, Search, Columns } from "lucide-react";
import { OrdersDataTable } from "@/components/orders/OrdersDataTable";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

const Orders = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-text-dark">Orders</h1>
        </div>

        <div className="space-y-4">
          <Tabs defaultValue="all-orders" className="w-full">
            <TabsList className="bg-transparent border-b border-gray-200 w-full justify-start h-auto p-0 space-x-6">
              <TabsTrigger 
                value="all-orders"
                className="px-0 py-3 h-auto data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                All orders
              </TabsTrigger>
              <TabsTrigger 
                value="unfulfilled"
                className="px-0 py-3 h-auto data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                Unfulfilled
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
          </Tabs>

          <div className="flex justify-between items-center gap-4">
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
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search order ..." 
                className="pl-10 bg-white border-gray-200"
              />
            </div>
          </div>

          <OrdersDataTable />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Orders;