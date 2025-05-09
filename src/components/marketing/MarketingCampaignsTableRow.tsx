import { Campaign } from "@/types/campaign";
import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Mail, Briefcase, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
interface MarketingCampaignsTableRowProps {
  campaign: Campaign;
  isSelected: boolean;
  onSelect: () => void;
}
export const getCampaignTypeIcon = (type: string) => {
  switch (type) {
    case "Email marketing":
      return <Mail className="h-4 w-4 text-blue-500" />;
    case "Business marketing":
      return <Briefcase className="h-4 w-4 text-purple-500" />;
    case "e-commerce marketing":
      return <ShoppingCart className="h-4 w-4 text-orange-500" />;
    default:
      return <Mail className="h-4 w-4 text-blue-500" />;
  }
};
export const MarketingCampaignsTableRow = ({
  campaign,
  isSelected,
  onSelect
}: MarketingCampaignsTableRowProps) => {
  return <TableRow key={campaign.id} className={cn(isSelected && "bg-muted/50")}>
      <TableCell className="w-[50px]">
        <Checkbox checked={isSelected} onCheckedChange={() => onSelect()} />
      </TableCell>
      <TableCell>
        <div className="font-medium">{campaign.name}</div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          {getCampaignTypeIcon(campaign.type)}
          <span>{campaign.type}</span>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant={campaign.status === "Sent" ? "success" : "outline"}>
          {campaign.status}
        </Badge>
      </TableCell>
      <TableCell>{campaign.lastUpdated}</TableCell>
      <TableCell className="">
        {campaign.openRate.value}% ({campaign.openRate.count})
      </TableCell>
      <TableCell className="text-right">
        {campaign.subscribedRate.value}% ({campaign.subscribedRate.count})
      </TableCell>
      <TableCell className="text-right">
        {campaign.activeRate.value}% ({campaign.activeRate.count})
      </TableCell>
    </TableRow>;
};