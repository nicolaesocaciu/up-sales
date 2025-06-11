
import { Sheet, SheetContent } from "../ui/sheet";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ProductModalHeader } from "./product-modal/ProductModalHeader";
import { ProductModalContent } from "./product-modal/ProductModalContent";
import { ProductModalFooter } from "./product-modal/ProductModalFooter";
import { UnsavedChangesDialog } from "./product-modal/UnsavedChangesDialog";

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

  const handleFormDataChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDuplicateProduct = () => {
    console.log('Duplicating product:', product.title);
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
      console.log('Updating product with ID:', product.id);
      console.log('Form data:', formData);

      const { error } = await supabase
        .from('products')
        .update({
          name: formData.title,
          category: formData.productType || 'Other',
        })
        .eq('id', product.id);

      if (error) {
        console.error('Error updating product:', error);
        toast({
          title: "Error",
          description: `Failed to update product: ${error.message}`,
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
      
      // Refresh the page to show updated data
      window.location.reload();
    } catch (error) {
      console.error('Error updating product:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    }
  };

  const handleManageAvailability = () => {
    console.log('Manage availability clicked');
  };

  const handleViewAllTags = () => {
    console.log('View all tags clicked');
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
            <ProductModalHeader
              title={formData.title}
              onDuplicateProduct={handleDuplicateProduct}
            />

            <ProductModalContent
              formData={formData}
              onFormDataChange={handleFormDataChange}
              onManageAvailability={handleManageAvailability}
              onViewAllTags={handleViewAllTags}
            />

            <ProductModalFooter
              onCancel={handleCloseAttempt}
              onUpdate={handleUpdate}
            />
          </div>
        </SheetContent>
      </Sheet>

      <UnsavedChangesDialog
        open={showUnsavedChangesDialog}
        onOpenChange={setShowUnsavedChangesDialog}
        onKeepEditing={() => setShowUnsavedChangesDialog(false)}
        onDiscardChanges={handleForceClose}
      />
    </>
  );
};
