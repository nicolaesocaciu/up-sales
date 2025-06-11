
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";

interface ProductOrganizationSectionProps {
  productType: string;
  vendor: string;
  collections: string[];
  tags: string;
  onProductTypeChange: (value: string) => void;
  onVendorChange: (value: string) => void;
  onRemoveCollection: (collection: string) => void;
  onTagsChange: (value: string) => void;
  onViewAllTags: () => void;
}

export const ProductOrganizationSection = ({
  productType,
  vendor,
  collections,
  tags,
  onProductTypeChange,
  onVendorChange,
  onRemoveCollection,
  onTagsChange,
  onViewAllTags
}: ProductOrganizationSectionProps) => {
  return (
    <>
      <Separator />
      <div className="space-y-4 pb-8">
        <h3 className="font-semibold text-lg">Organization</h3>
        
        <div className="space-y-2">
          <Label htmlFor="productType">Product type</Label>
          <Input 
            id="productType" 
            value={productType} 
            onChange={e => onProductTypeChange(e.target.value)} 
            placeholder="e.g. Shirts" 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="vendor">Vendor</Label>
          <Input 
            id="vendor" 
            value={vendor} 
            onChange={e => onVendorChange(e.target.value)} 
            placeholder="Enter vendor name" 
          />
        </div>

        <div className="space-y-2">
          <Label>Collections</Label>
          <div className="flex flex-wrap gap-2">
            {collections.map((collection, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {collection}
                <button onClick={() => onRemoveCollection(collection)}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Tags</Label>
            <Button variant="link" className="text-[#116fae]" onClick={onViewAllTags}>
              View all tags
            </Button>
          </div>
          <Input 
            value={tags} 
            onChange={e => onTagsChange(e.target.value)} 
            placeholder="Vintage, cotton, summer" 
          />
        </div>
      </div>
    </>
  );
};
