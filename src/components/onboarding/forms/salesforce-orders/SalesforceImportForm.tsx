
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Check, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type DataType = "both" | "contacts" | "opportunities";

type SalesforceImportFormProps = {
  salesforceDomain: string;
  dataType: DataType;
  setDataType: (type: DataType) => void;
  timeframe: string;
  setTimeframe: (timeframe: string) => void;
  isImporting: boolean;
  importSuccess: boolean;
  contactsCount: number;
  ordersCount: number;
  handleImport: () => void;
};

export const SalesforceImportForm = ({
  salesforceDomain,
  dataType,
  setDataType,
  timeframe,
  setTimeframe,
  isImporting,
  importSuccess,
  contactsCount,
  ordersCount,
  handleImport
}: SalesforceImportFormProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Badge variant="blue" className="text-xs px-[12px] py-[3px]">
          <Check size={14} className="mr-1" />
          Connected to {salesforceDomain}
        </Badge>
      </div>
      
      <div className="bg-white p-4 rounded-lg">
        <h4 className="font-medium mb-2">Available data to import:</h4>
        <ul className="list-disc list-inside space-y-1">
          <li>{contactsCount} contacts (users)</li>
          <li>{ordersCount} opportunities (orders)</li>
        </ul>
      </div>
      
      <div>
        <Label htmlFor="data-type">What to import</Label>
        <Select value={dataType} onValueChange={(value: DataType) => setDataType(value)}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select data to import" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="both">Both contacts and opportunities</SelectItem>
            <SelectItem value="contacts">Contacts only</SelectItem>
            <SelectItem value="opportunities">Opportunities only</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="timeframe">Time period</Label>
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All time</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="quarter">Current quarter</SelectItem>
            <SelectItem value="year">Current year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {importSuccess ? (
        <div className="flex items-center gap-4">
          <Button disabled className="opacity-75 border border-[#116FAE] bg-[#116FAE] rounded-[8px]">
            <Check className="mr-2 h-4 w-4" /> Successfully imported
          </Button>
          <Badge variant="green" className="flex items-center gap-2 px-[12px] py-[3px]">
            <Check size={14} className="text-[#2D7048]" />
            <span className="text-sm">
              {dataType === "both" || dataType === "contacts" ? `${contactsCount} users` : ""}
              {dataType === "both" ? " and " : ""}
              {dataType === "both" || dataType === "opportunities" ? `${ordersCount} orders` : ""} successfully imported
            </span>
          </Badge>
        </div>
      ) : (
        <Button 
          onClick={handleImport}
          disabled={isImporting}
          className="border border-[#116FAE] bg-[#116FAE] hover:bg-[#0D5788] hover:border-[#0D5788] rounded-[8px]"
        >
          {isImporting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isImporting ? "Importing..." : "Import Selected Data"}
        </Button>
      )}
    </div>
  );
};
