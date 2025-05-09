
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ProductsDataTable } from "@/components/products/ProductsDataTable";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { AddProductDialog } from "@/components/products/AddProductDialog";

const Products = () => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedTab, setSelectedTab] = useState<string | null>("all-products");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-text-dark">Products</h1>
          <div className="flex gap-2">
            <Button 
              variant="outline"
              className="gap-2 h-[36px]"
            >
              Export
            </Button>
            <Button 
              onClick={() => setShowAddDialog(true)} 
              className="h-[36px] border border-[#116FAE] bg-[#116FAE] shadow-[0px_2px_4px_0px_rgba(13,87,136,0.16)] hover:border-[#0D5788] hover:bg-[#0D5788] active:border-[#14476A] active:bg-[#14476A] rounded-[8px]"
            >
              <Plus className="h-4 w-4" />
              Add product
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Tabs value={selectedTab || "all-products"} onValueChange={(value) => setSelectedTab(value)} className="w-full">
            <TabsList className="bg-transparent border-b border-gray-200 w-full justify-start h-auto p-0 space-x-6">
              <TabsTrigger 
                value="all-products"
                className="px-0 py-3 h-auto data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-[#116fae] data-[state=active]:border-b-2 data-[state=active]:border-[#116fae] rounded-none"
              >
                All products
              </TabsTrigger>
              <TabsTrigger 
                value="Out of stock"
                className="px-0 py-3 h-auto data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-[#116fae] data-[state=active]:border-b-2 data-[state=active]:border-[#116fae] rounded-none"
              >
                Out of stock
              </TabsTrigger>
              <TabsTrigger 
                value="Low stock"
                className="px-0 py-3 h-auto data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-[#116fae] data-[state=active]:border-b-2 data-[state=active]:border-[#116fae] rounded-none"
              >
                Low stock
              </TabsTrigger>
              <TabsTrigger 
                value="Stable stock"
                className="px-0 py-3 h-auto data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-[#116fae] data-[state=active]:border-b-2 data-[state=active]:border-[#116fae] rounded-none"
              >
                Stable stock
              </TabsTrigger>
              <TabsTrigger 
                value="Overstock stock"
                className="px-0 py-3 h-auto data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-[#116fae] data-[state=active]:border-b-2 data-[state=active]:border-[#116fae] rounded-none"
              >
                Overstock
              </TabsTrigger>
              <TabsTrigger 
                value="Insufficient data"
                className="px-0 py-3 h-auto data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-[#116fae] data-[state=active]:border-b-2 data-[state=active]:border-[#116fae] rounded-none"
              >
                Insufficient data
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value={selectedTab || "all-products"} className="mt-4">
              <ProductsDataTable stockFilter={selectedTab === "all-products" ? null : selectedTab} />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <AddProductDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
      />
    </DashboardLayout>
  );
};

export default Products;
