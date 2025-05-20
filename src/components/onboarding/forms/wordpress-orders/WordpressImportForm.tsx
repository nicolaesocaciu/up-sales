
import { Check, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type WordpressImportFormProps = {
  wordpressUrl: string;
  importUsers: boolean;
  setImportUsers: (checked: boolean) => void;
  importOrders: boolean;
  setImportOrders: (checked: boolean) => void;
  isImporting: boolean;
  importSuccess: boolean;
  usersCount: number;
  ordersCount: number;
  handleImport: () => void;
};

export const WordpressImportForm = ({
  wordpressUrl,
  importUsers,
  setImportUsers,
  importOrders,
  setImportOrders,
  isImporting,
  importSuccess,
  usersCount,
  ordersCount,
  handleImport
}: WordpressImportFormProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Badge variant="blue" className="text-xs px-[12px] py-[3px]">
          <Check size={14} className="mr-1" />
          Connected to {wordpressUrl}
        </Badge>
      </div>
      
      <div className="bg-white p-4 rounded-lg">
        <h4 className="font-medium mb-2">Available data to import:</h4>
        <ul className="list-disc list-inside space-y-1">
          <li>{usersCount} users</li>
          <li>{ordersCount} orders</li>
        </ul>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="import-users" 
            checked={importUsers}
            onCheckedChange={(checked) => setImportUsers(checked === true)}
          />
          <Label htmlFor="import-users">Import users</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="import-orders" 
            checked={importOrders}
            onCheckedChange={(checked) => setImportOrders(checked === true)}
          />
          <Label htmlFor="import-orders">Import orders</Label>
        </div>
      </div>
      
      {importSuccess ? (
        <div className="flex items-center gap-4">
          <Button disabled className="opacity-75 border border-[#116FAE] bg-[#116FAE] rounded-[8px]">
            <Check className="mr-2 h-4 w-4" /> Successfully imported
          </Button>
          <Badge variant="green" className="flex items-center gap-2 px-[12px] py-[3px]">
            <Check size={14} className="text-[#2D7048]" />
            <span className="text-sm">
              {importUsers ? `${usersCount} users` : ""}
              {importUsers && importOrders ? " and " : ""}
              {importOrders ? `${ordersCount} orders` : ""} successfully imported
            </span>
          </Badge>
        </div>
      ) : (
        <Button 
          onClick={handleImport}
          disabled={isImporting || (!importUsers && !importOrders)}
          className="border border-[#116FAE] bg-[#116FAE] hover:bg-[#0D5788] hover:border-[#0D5788] rounded-[8px]"
        >
          {isImporting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isImporting ? "Importing..." : "Import Selected Data"}
        </Button>
      )}
    </div>
  );
};
