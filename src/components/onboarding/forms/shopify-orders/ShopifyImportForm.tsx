
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Loader2, Check } from "lucide-react";

type ShopifyImportFormProps = {
  shopifyStore: string;
  dateRange: string;
  setDateRange: (value: string) => void;
  usersCount: number;
  ordersCount: number;
  isImporting: boolean;
  importSuccess: boolean;
  handleImport: () => void;
};

export const ShopifyImportForm = ({
  shopifyStore,
  dateRange,
  setDateRange,
  usersCount,
  ordersCount,
  isImporting,
  importSuccess,
  handleImport
}: ShopifyImportFormProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Badge variant="blue" className="text-xs px-[12px] py-[3px]">
          <Check size={14} className="mr-1" />
          Connected to {shopifyStore}
        </Badge>
      </div>
      
      <div>
        <Label>Date range for orders</Label>
        <RadioGroup value={dateRange} onValueChange={setDateRange} className="mt-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="date-all" />
            <Label htmlFor="date-all">All time</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="30days" id="30days" />
            <Label htmlFor="30days">Last 30 days</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="90days" id="90days" />
            <Label htmlFor="90days">Last 90 days</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="12months" id="12months" />
            <Label htmlFor="12months">Last 12 months</Label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="bg-white p-4 rounded-lg">
        <h4 className="font-medium mb-2">Available data to import:</h4>
        <ul className="list-disc list-inside space-y-1">
          <li>{usersCount} users</li>
          <li>{ordersCount} orders</li>
        </ul>
      </div>
      
      {importSuccess ? (
        <div className="flex items-center gap-4">
          <Button disabled className="opacity-75 border border-[#116FAE] bg-[#116FAE] rounded-[8px]">
            <Check className="mr-2 h-4 w-4" /> Successfully imported
          </Button>
          <Badge variant="green" className="flex items-center gap-2 px-[12px] py-[3px]">
            <Check size={14} className="text-[#2D7048]" />
            <span className="text-sm">{usersCount} users and {ordersCount} orders successfully imported</span>
          </Badge>
        </div>
      ) : (
        <Button 
          onClick={handleImport}
          disabled={isImporting}
          className="border border-[#116FAE] bg-[#116FAE] hover:bg-[#0D5788] hover:border-[#0D5788] rounded-[8px]"
        >
          {isImporting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isImporting ? "Importing..." : "Import Data"}
        </Button>
      )}
    </div>
  );
};
