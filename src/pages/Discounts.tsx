
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { DiscountsDataTable } from "@/components/discounts/DiscountsDataTable";
import { AddDiscountDialog } from "@/components/discounts/AddDiscountDialog";

const Discounts = () => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedTab, setSelectedTab] = useState<string | null>("all-discounts");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-text-dark">Discounts</h1>
          <div className="flex gap-2">
            <Button 
              variant="outline"
              className="gap-2"
            >
              Export
            </Button>
            <Button 
              onClick={() => setShowAddDialog(true)} 
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Create Discount
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Tabs value={selectedTab || "all-discounts"} onValueChange={(value) => setSelectedTab(value)} className="w-full">
            <TabsList className="bg-transparent border-b border-gray-200 w-full justify-start h-auto p-0 space-x-6">
              <TabsTrigger 
                value="all-discounts"
                className="px-0 py-3 h-auto data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-[#116fae] data-[state=active]:border-b-2 data-[state=active]:border-[#116fae] rounded-none"
              >
                All Discounts
              </TabsTrigger>
              <TabsTrigger 
                value="active"
                className="px-0 py-3 h-auto data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-[#116fae] data-[state=active]:border-b-2 data-[state=active]:border-[#116fae] rounded-none"
              >
                Active
              </TabsTrigger>
              <TabsTrigger 
                value="expired"
                className="px-0 py-3 h-auto data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-[#116fae] data-[state=active]:border-b-2 data-[state=active]:border-[#116fae] rounded-none"
              >
                Expired
              </TabsTrigger>
              <TabsTrigger 
                value="pending"
                className="px-0 py-3 h-auto data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-[#116fae] data-[state=active]:border-b-2 data-[state=active]:border-[#116fae] rounded-none"
              >
                Pending
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value={selectedTab || "all-discounts"} className="mt-4">
              <DiscountsDataTable statusFilter={selectedTab === "all-discounts" ? null : selectedTab} />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <AddDiscountDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
      />
    </DashboardLayout>
  );
};

export default Discounts;
