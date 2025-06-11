
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "./ImageUpload";
import { ProductAvailabilitySection } from "./ProductAvailabilitySection";
import { ProductOrganizationSection } from "./ProductOrganizationSection";

interface ProductModalContentProps {
  formData: {
    title: string;
    description: string;
    vendor: string;
    productType: string;
    collections: string[];
    tags: string;
    salesChannel: string;
    images: string[];
  };
  onFormDataChange: (field: string, value: any) => void;
  onManageAvailability: () => void;
  onViewAllTags: () => void;
}

export const ProductModalContent = ({
  formData,
  onFormDataChange,
  onManageAvailability,
  onViewAllTags
}: ProductModalContentProps) => {
  const handleRemoveCollection = (collectionToRemove: string) => {
    onFormDataChange('collections', formData.collections.filter(c => c !== collectionToRemove));
  };

  return (
    <div className="space-y-6 mb-3">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input 
          id="title" 
          value={formData.title} 
          onChange={e => onFormDataChange('title', e.target.value)} 
        />
      </div>
      
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description" 
          value={formData.description} 
          onChange={e => onFormDataChange('description', e.target.value)} 
          placeholder="Enter product description" 
          className="h-32 min-h-[80px]" 
        />
      </div>

      <ImageUpload
        images={formData.images}
        onImagesChange={(images) => onFormDataChange('images', images)}
      />

      <ProductAvailabilitySection
        salesChannel={formData.salesChannel}
        onSalesChannelChange={(value) => onFormDataChange('salesChannel', value)}
        onManageAvailability={onManageAvailability}
      />

      <ProductOrganizationSection
        productType={formData.productType}
        vendor={formData.vendor}
        collections={formData.collections}
        tags={formData.tags}
        onProductTypeChange={(value) => onFormDataChange('productType', value)}
        onVendorChange={(value) => onFormDataChange('vendor', value)}
        onRemoveCollection={handleRemoveCollection}
        onTagsChange={(value) => onFormDataChange('tags', value)}
        onViewAllTags={onViewAllTags}
      />
    </div>
  );
};
