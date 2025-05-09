
import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye, Pencil, Copy, Trash } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ColumnVisibility } from "./MarketingCampaignsTableColumns";
import { Campaign } from "@/types/campaign";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface MarketingCampaignsTableRowProps {
  campaign: Campaign;
  columnVisibility: ColumnVisibility;
  selected: boolean;
  onSelect: (id: string, checked: boolean) => void;
  highlightText: (text: string) => React.ReactNode;
}
export const MarketingCampaignsTableRow = ({
  campaign,
  columnVisibility,
  selected,
  onSelect,
  highlightText
}: MarketingCampaignsTableRowProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const renderStatusBadge = (status: string) => {
    if (status === 'Sent') {
      return <Badge variant="success">Sent</Badge>;
    } else if (status === 'Draft') {
      return <Badge variant="warning">Draft</Badge>;
    }
    return status;
  };
  
  return <TableRow className="h-12 hover:bg-[#E7F2F9]">
      <TableCell>
        <Checkbox checked={selected} onCheckedChange={checked => onSelect(campaign.id, checked === true)} aria-label={`Select ${campaign.name}`} className="rounded-[4px]" />
      </TableCell>
      
      {columnVisibility.name && <TableCell className="text-[#116fae]">
          {highlightText(campaign.name)}
        </TableCell>}
      
      {columnVisibility.type && <TableCell>
          {highlightText(campaign.type)}
        </TableCell>}
      
      {columnVisibility.status && <TableCell>
          {renderStatusBadge(campaign.status)}
        </TableCell>}
      
      {columnVisibility.lastUpdated && <TableCell>
          {campaign.lastUpdated}
        </TableCell>}
      
      {columnVisibility.openRate && <TableCell>
          {campaign.openRate.value}% ({campaign.openRate.count})
        </TableCell>}
      
      {columnVisibility.subscribedRate && <TableCell>
          {campaign.subscribedRate.value}% ({campaign.subscribedRate.count})
        </TableCell>}
      
      {columnVisibility.activeRate && <TableCell>
          {campaign.activeRate.value}% ({campaign.activeRate.count})
        </TableCell>}
      
      {columnVisibility.actions && <TableCell className="text-center w-[50]">
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className={`transition-colors ${isDropdownOpen ? 'bg-[rgba(153,203,236,0.50)]' : 'hover:bg-[rgba(153,203,236,0.50)]'}`}>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px] p-2 rounded-xl bg-white z-[9999] shadow-lg" sideOffset={-10}>
              <DropdownMenuItem className="flex items-center gap-2 px-4 py-3 text-sm cursor-pointer hover:bg-[#E7F2F9] rounded-lg">
                <Eye className="h-4 w-4" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 px-4 py-3 text-sm cursor-pointer hover:bg-[#E7F2F9] rounded-lg">
                <Pencil className="h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 px-4 py-3 text-sm cursor-pointer hover:bg-[#E7F2F9] rounded-lg">
                <Copy className="h-4 w-4" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 px-4 py-3 text-sm cursor-pointer hover:bg-[#E7F2F9] rounded-lg text-red-600 hover:text-red-600">
                <Trash className="h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>}
    </TableRow>;
};
