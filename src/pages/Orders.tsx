
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { OrdersDataTable } from "@/components/orders/OrdersDataTable";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useState } from "react";
import { FulfillmentStatus } from "@/types/order";
import { Button } from "@/components/ui/button";
import { AddOrderDialog } from "@/components/orders/AddOrderDialog";

const Orders = () => {
  const [selectedTab, setSelectedTab] = useState<FulfillmentStatus | "all-orders">("all-orders");
  const [showAddDialog, setShowAddDialog] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-text-dark">Orders</h1>
          <div className="flex gap-2">
            <Button 
              variant="outline"
              className="gap-2"
            >
              Export
            </Button>
            <Button 
              onClick={() => setShowAddDialog(true)}
              className="h-10 px-4 py-2"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add manual order
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Tabs value={selectedTab} onValueChange={(value) => setSelectedTab(value as FulfillmentStatus | "all-orders")} className="w-full">
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
          </div>

          <OrdersDataTable selectedTab={selectedTab} />
        </div>

        <AddOrderDialog 
          open={showAddDialog} 
          onOpenChange={setShowAddDialog}
        />
      </div>
    </DashboardLayout>
  );
};

export default Orders;
