
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "../ui/sheet";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Copy, X, Plus } from "lucide-react";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: {
    id?: string;
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
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showUnsavedChangesDialog, setShowUnsavedChangesDialog] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  const [formData, setFormData] = useState({
    title: product.title,
    description: product.description || '',
    vendor: product.vendor || '',
    productType: product.productType || '',
    collections: product.collections || [],
    tags: product.tags?.join(', ') || '',
    salesChannel: '',
    images: product.images || []
  });

  const [originalData, setOriginalData] = useState(formData);

  // Update form data when product changes
  useEffect(() => {
    const newFormData = {
      title: product.title,
      description: product.description || '',
      vendor: product.vendor || '',
      productType: product.productType || '',
      collections: product.collections || [],
      tags: product.tags?.join(', ') || '',
      salesChannel: '',
      images: product.images || []
    };
    setFormData(newFormData);
    setOriginalData(newFormData);
    setHasUnsavedChanges(false);
  }, [product]);

  // Check for unsaved changes
  useEffect(() => {
    const hasChanges = JSON.stringify(formData) !== JSON.stringify(originalData);
    setHasUnsavedChanges(hasChanges);
  }, [formData, originalData]);

  // Handle ESC key properly
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        handleCloseAttempt();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, hasUnsavedChanges]);

  const handleCloseAttempt = () => {
    if (hasUnsavedChanges) {
      setShowUnsavedChangesDialog(true);
    } else {
      onOpenChange(false);
    }
  };

  const handleForceClose = () => {
    setFormData(originalData);
    setHasUnsavedChanges(false);
    setShowUnsavedChangesDialog(false);
    onOpenChange(false);
  };

  const handleDuplicateProduct = () => {
    console.log('Duplicating product:', product.title);
    // Add duplication logic here
  };

  const handleUpdate = async () => {
    if (!product.id) {
      toast({
        title: "Error",
        description: "Product ID is missing",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('products')
        .update({
          name: formData.title,
          // Add other fields as they exist in your products table
          // Note: You may need to adjust these field names based on your actual database schema
        })
        .eq('id', product.id);

      if (error) {
        console.error('Error updating product:', error);
        toast({
          title: "Error",
          description: "Failed to update product",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Success",
        description: "Product updated successfully"
      });
      
      setOriginalData(formData);
      setHasUnsavedChanges(false);
      onOpenChange(false);
    } catch (error) {
      console.error('Error updating product:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    }
  };

  const handleCancel = () => {
    handleCloseAttempt();
  };

  const handleRemoveCollection = (collectionToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      collections: prev.collections.filter(c => c !== collectionToRemove)
    }));
  };

  const handleAddImage = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // Convert FileList to Array and create object URLs for preview
      const newImageUrls = Array.from(files).map(file => URL.createObjectURL(file));
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...newImageUrls]
      }));
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
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
    <>
      <Sheet open={open} onOpenChange={handleCloseAttempt}>
        <SheetContent 
          className="w-[800px] sm:max-w-[800px] h-full overflow-y-auto rounded-tl-[24px] rounded-bl-[24px] bg-white p-12" 
          onInteractOutside={handleCloseAttempt} 
          onEscapeKeyDown={handleCloseAttempt}
        >
          <div className="flex flex-col h-full">
            <SheetHeader className="space-y-6">
              <div className="flex items-center justify-between">
                <SheetTitle className="text-2xl font-bold text-text-dark">{formData.title}</SheetTitle>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    onClick={handleDuplicateProduct}
                    className="flex items-center gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    <span className="text-sm">Duplicate product</span>
                  </Button>
                </div>
              </div>
              
              <div className="space-y-6 mb-3">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input 
                    id="title" 
                    value={formData.title} 
                    onChange={e => setFormData(prev => ({
                      ...prev,
                      title: e.target.value
                    }))} 
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    value={formData.description} 
                    onChange={e => setFormData(prev => ({
                      ...prev,
                      description: e.target.value
                    }))} 
                    placeholder="Enter product description" 
                    className="h-32 min-h-[80px]" 
                  />
                </div>

                <div>
                  <Label>Images</Label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="mt-2 grid grid-cols-2 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative">
                        <img 
                          src={image} 
                          alt={`Product ${index + 1}`} 
                          className="w-full h-48 object-cover rounded-lg border" 
                        />
                        <button
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
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
                    <Select 
                      value={formData.salesChannel} 
                      onValueChange={value => setFormData(prev => ({
                        ...prev,
                        salesChannel: value
                      }))}
                    >
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

                <div className="space-y-4 pb-8">
                  <h3 className="font-semibold text-lg">Organization</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="productType">Product type</Label>
                    <Input 
                      id="productType" 
                      value={formData.productType} 
                      onChange={e => setFormData(prev => ({
                        ...prev,
                        productType: e.target.value
                      }))} 
                      placeholder="e.g. Shirts" 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vendor">Vendor</Label>
                    <Input 
                      id="vendor" 
                      value={formData.vendor} 
                      onChange={e => setFormData(prev => ({
                        ...prev,
                        vendor: e.target.value
                      }))} 
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
                      onChange={e => setFormData(prev => ({
                        ...prev,
                        tags: e.target.value
                      }))} 
                      placeholder="Vintage, cotton, summer" 
                    />
                  </div>
                </div>
              </div>
            </SheetHeader>

            <SheetFooter className="mt-auto pt-6 border-t pb-12">
              <div className="flex gap-3 w-full">
                <Button variant="outline" onClick={handleCancel} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleUpdate} className="flex-1">
                  Update product
                </Button>
              </div>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>

      <AlertDialog open={showUnsavedChangesDialog} onOpenChange={setShowUnsavedChangesDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. If you close this panel, all changes will be lost. Are you sure you want to continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowUnsavedChangesDialog(false)}>
              Keep editing
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleForceClose}>
              Discard changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
