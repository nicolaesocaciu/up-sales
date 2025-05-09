import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnVisibility } from "./MarketingCampaignsTableColumns";
import { Check, ChevronDown, ChevronUp, Minus } from "lucide-react";
interface MarketingCampaignsTableHeaderProps {
  sortDirection: "asc" | "desc";
  sortBy: string;
  onSortChange: (column: string) => void;
  columnVisibility: ColumnVisibility;
  selectedRows: string[];
  onSelectAll: (checked: boolean) => void;
  totalRows: number;
}
export const MarketingCampaignsTableHeader = ({
  sortDirection,
  sortBy,
  onSortChange,
  columnVisibility,
  selectedRows,
  onSelectAll,
  totalRows
}: MarketingCampaignsTableHeaderProps) => {
  const isIndeterminate = selectedRows.length > 0 && selectedRows.length < totalRows;
  const isSelected = selectedRows.length === totalRows && totalRows > 0;
  const renderSortIcon = (column: string) => {
    if (sortBy !== column) return null;
    return sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
  };
  return <TableHeader className="bg-[#F2F2F2] rounded-[8px]">
      <TableRow className="hover:bg-transparent border-none h-12">
        <TableHead className="rounded-l-[8px] w-[40px]">
          <Checkbox checked={isSelected} className="rounded-[4px] data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground" onCheckedChange={onSelectAll} data-state={isIndeterminate ? "indeterminate" : isSelected ? "checked" : "unchecked"} aria-checked={isIndeterminate ? "mixed" : isSelected}>
            {isIndeterminate ? <Minus className="h-4 w-4" /> : isSelected ? <Check className="h-4 w-4" /> : null}
          </Checkbox>
        </TableHead>
        
        {columnVisibility.name && <TableHead onClick={() => onSortChange('name')} className="cursor-pointer hover:bg-[#DADADA]">
            <div className="flex items-center gap-2">
              Campaigns {renderSortIcon('name')}
            </div>
          </TableHead>}
        
        {columnVisibility.type && <TableHead onClick={() => onSortChange('type')} className="cursor-pointer hover:bg-[#DADADA]">
            <div className="flex items-center gap-2">
              Type {renderSortIcon('type')}
            </div>
          </TableHead>}
        
        {columnVisibility.status && <TableHead onClick={() => onSortChange('status')} className="cursor-pointer hover:bg-[#DADADA]">
            <div className="flex items-center gap-2">
              Status {renderSortIcon('status')}
            </div>
          </TableHead>}
        
        {columnVisibility.lastUpdated && <TableHead onClick={() => onSortChange('lastUpdated')} className="cursor-pointer hover:bg-[#DADADA]">
            <div className="flex items-center gap-2">
              Last updated {renderSortIcon('lastUpdated')}
            </div>
          </TableHead>}
        
        {columnVisibility.openRate && <TableHead onClick={() => onSortChange('openRate')} className="cursor-pointer hover:bg-[#DADADA]">
            <div className="flex items-center gap-2">
              Open rate {renderSortIcon('openRate')}
            </div>
          </TableHead>}
        
        {columnVisibility.subscribedRate && <TableHead onClick={() => onSortChange('subscribedRate')} className="cursor-pointer hover:bg-[#DADADA]">
            <div className="flex items-center gap-2">
              Subscribed {renderSortIcon('subscribedRate')}
            </div>
          </TableHead>}
        
        {columnVisibility.activeRate && <TableHead onClick={() => onSortChange('activeRate')} className="cursor-pointer hover:bg-[#DADADA]">
            <div className="flex items-center gap-2">
              Active on site {renderSortIcon('activeRate')}
            </div>
          </TableHead>}
        
        {columnVisibility.actions && <TableHead className="rounded-r-[8px] w-[50px] text-center">Actions</TableHead>}
      </TableRow>
    </TableHeader>;
};