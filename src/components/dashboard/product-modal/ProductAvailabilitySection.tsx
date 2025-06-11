
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface ProductAvailabilitySectionProps {
  salesChannel: string;
  onSalesChannelChange: (value: string) => void;
  onManageAvailability: () => void;
}

export const ProductAvailabilitySection = ({
  salesChannel,
  onSalesChannelChange,
  onManageAvailability
}: ProductAvailabilitySectionProps) => {
  return (
    <>
      <Separator />
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Product availability</h3>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">Available on 1 of 1 channels and apps</p>
          <Button variant="link" className="text-[#116fae]" onClick={onManageAvailability}>
            Manage
          </Button>
        </div>
        
        <div className="space-y-2">
          <p className="font-medium">Online Store</p>
          <Select value={salesChannel} onValueChange={onSalesChannelChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select sales channel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="online-store">Online Store</SelectItem>
              <SelectItem value="pos">Point of Sale</SelectItem>
              <SelectItem value="marketplace">Marketplace</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
};
