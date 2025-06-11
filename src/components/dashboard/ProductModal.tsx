
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "../ui/sheet";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Copy, X, Plus } from "lucide-react";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useEffect, useState } from "react";

interface ProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: {
    title: string;
    description?: string;
    images?: string[];
    vendor?: string;
    productType?: string;
    collections?: string[];
    tags?: string[];
  };
}

export const ProductModal = ({
  open,
  onOpenChange,
  product
}: ProductModalProps) => {
  const [formData, setFormData] = useState({
    title: product.title,
    description: product.description || '',
    vendor: product.vendor || '',
    productType: product.productType || '',
    collections: product.collections || [],
    tags: product.tags?.join(', ') || '',
    salesChannel: '',
  });

  // Update form data when product changes
  useEffect(() => {
    setFormData({
      title: product.title,
      description: product.description || '',
      vendor: product.vendor || '',
      productType: product.productType || '',
      collections: product.collections || [],
      tags: product.tags?.join(', ') || '',
      salesChannel: '',
    });
  }, [product]);

  // Handle ESC key properly
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onOpenChange(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onOpenChange]);

  const handleDuplicateProduct = () => {
    console.log('Duplicating product:', product.title);
    // Add duplication logic here
  };

  const handleUpdate = () => {
    console.log('Updating product with:', formData);
    // Add update logic here
    onOpenChange(false);
  };

  const handleCancel = () => {
    // Reset form data to original values
    setFormData({
      title: product.title,
      description: product.description || '',
      vendor: product.vendor || '',
      productType: product.productType || '',
      collections: product.collections || [],
      tags: product.tags?.join(', ') || '',
      salesChannel: '',
    });
    onOpenChange(false);
  };

  const handleRemoveCollection = (collectionToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      collections: prev.collections.filter(c => c !== collectionToRemove)
    }));
  };

  const handleAddImage = () => {
    console.log('Add image clicked');
    // Add image upload logic here
  };

  const handleManageAvailability = () => {
    console.log('Manage availability clicked');
    // Add manage availability logic here
  };

  const handleViewAllTags = () => {
    console.log('View all tags clicked');
    // Add view all tags logic here
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        className="w-[800px] sm:max-w-[800px] h-full overflow-y-auto rounded-tl-[24px] rounded-bl-[24px] bg-white p-12" 
        onInteractOutside={() => onOpenChange(false)}
        onEscapeKeyDown={() => onOpenChange(false)}
      >
        <div className="flex flex-col h-full">
          <SheetHeader className="space-y-6">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-2xl font-bold text-text-dark">{formData.title}</SheetTitle>
              <div className="flex items-center gap-2">
                <div className="flex flex-col items-center gap-1">
                  <Button variant="outline" size="icon" onClick={handleDuplicateProduct}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <span className="text-xs text-gray-500">Duplicate product</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-6 mb-3">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  value={formData.title} 
                  onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  value={formData.description} 
                  onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                  placeholder="Enter product description"
                  className="h-32 min-h-[80px]" 
                />
              </div>

              <div>
                <Label>Images</Label>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  {product.images?.map((image, index) => (
                    <img 
                      key={index} 
                      src={image} 
                      alt={`Product ${index + 1}`} 
                      className="w-full h-48 object-cover rounded-lg border" 
                    />
                  ))}
                  <button
                    onClick={handleAddImage}
                    className="border-2 border-dashed rounded-lg flex items-center justify-center h-48 hover:border-gray-400 transition-colors"
                  >
                    <div className="text-center">
                      <Plus className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-500">Add images</p>
                      <p className="text-xs text-gray-400">or drop files to upload</p>
                    </div>
                  </button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Product availability</h3>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">Available on 1 of 1 channels and apps</p>
                  <Button variant="link" className="text-[#116fae]" onClick={handleManageAvailability}>
                    Manage
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <p className="font-medium">Online Store</p>
                  <Select value={formData.salesChannel} onValueChange={(value) => setFormData(prev => ({...prev, salesChannel: value}))}>
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

              <Separator />

              <div className="space-y-4 pb-12">
                <h3 className="font-semibold text-lg">Organization</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="productType">Product type</Label>
                  <Input 
                    id="productType" 
                    value={formData.productType} 
                    onChange={(e) => setFormData(prev => ({...prev, productType: e.target.value}))}
                    placeholder="e.g. Shirts" 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vendor">Vendor</Label>
                  <Input 
                    id="vendor" 
                    value={formData.vendor} 
                    onChange={(e) => setFormData(prev => ({...prev, vendor: e.target.value}))}
                    placeholder="Enter vendor name"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Collections</Label>
                  <div className="flex flex-wrap gap-2">
                    {formData.collections.map((collection, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {collection}
                        <button onClick={() => handleRemoveCollection(collection)}>
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Tags</Label>
                    <Button variant="link" className="text-[#116fae]" onClick={handleViewAllTags}>
                      View all tags
                    </Button>
                  </div>
                  <Input 
                    value={formData.tags} 
                    onChange={(e) => setFormData(prev => ({...prev, tags: e.target.value}))}
                    placeholder="Vintage, cotton, summer" 
                  />
                </div>
              </div>
            </div>
          </SheetHeader>

          <SheetFooter className="mt-auto pt-6 border-t">
            <div className="flex gap-3 w-full">
              <Button variant="outline" onClick={handleCancel} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleUpdate} className="flex-1">
                Update
              </Button>
            </div>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};
