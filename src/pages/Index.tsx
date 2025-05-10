
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsSection } from "@/components/dashboard/StatsSection";
import { OrdersAndSalesSection } from "@/components/dashboard/OrdersAndSalesSection";
import { ProductsAndAdsSection } from "@/components/dashboard/ProductsAndAdsSection";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SettingsIcon } from "@/components/ui/icons/SettingsIcon";

const Index = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };
  const handleSave = () => {
    // Here you would save the new layout configuration
    setIsEditMode(false);
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <div className="flex items-center gap-4">
            {isEditMode && 
              <Button 
                onClick={handleSave} 
                className="bg-[#22C55E] hover:bg-[#22C55E]/90 text-white h-[40px]"
              >
                <Check className="mr-2 h-4 w-4" />
                Save dashboard
              </Button>
            }
            <Button 
              variant="outline" 
              onClick={toggleEditMode} 
              className={cn(
                "my-0 py-0 mx-0 px-[16px] h-[36px]",
                isEditMode && "bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
              )}
            >
              {isEditMode ? (
                <>
                  <X className="mr-2 h-4 w-4" />
                  Cancel edit
                </>
              ) : (
                <>
                  <SettingsIcon className="mr-2 h-4 w-4" />
                  Edit dashboard
                </>
              )}
            </Button>
          </div>
        </div>

        <StatsSection isEditMode={isEditMode} />
        <OrdersAndSalesSection isEditMode={isEditMode} />
        <ProductsAndAdsSection isEditMode={isEditMode} />
      </div>
    </DashboardLayout>
  );
};

export default Index;
