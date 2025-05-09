
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface AddDiscountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddDiscountDialog = ({ open, onOpenChange }: AddDiscountDialogProps) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    // Here you would handle the form submission to add a new discount
    setTimeout(() => {
      setLoading(false);
      onOpenChange(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create new discount</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Form fields would go here - similar to those in AddProductDialog */}
          <p className="text-sm text-gray-500">
            This is a placeholder for the discount creation form. 
            In a real implementation, this would include fields for discount title, 
            description, method, type, status, etc.
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Creating..." : "Create discount"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
