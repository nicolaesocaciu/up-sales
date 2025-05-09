
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductsDataTable } from "@/components/products/ProductsDataTable";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { AddProductDialog } from "@/components/products/AddProductDialog";

const Products = () => {
  const [showAddDialog, setShowAddDialog] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-text-dark">Products</h1>
          <Button 
            onClick={() => setShowAddDialog(true)} 
            className="gap-2"
            style={{
              border: "1px solid #2D7048",
              backgroundColor: "#2D7048",
              boxShadow: "0px 2px 4px 0px rgba(78, 156, 84, 0.20)",
              borderRadius: "8px"
            }}
          >
            <Plus className="h-4 w-4" />
            Add product
          </Button>
        </div>

        <ProductsDataTable />
      </div>

      <AddProductDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
      />
    </DashboardLayout>
  );
};

export default Products;
