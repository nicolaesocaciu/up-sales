
import { SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface ProductModalFooterProps {
  onCancel: () => void;
  onUpdate: () => void;
}

export const ProductModalFooter = ({ onCancel, onUpdate }: ProductModalFooterProps) => {
  return (
    <SheetFooter className="mt-auto pt-6 border-t pb-12">
      <div className="flex gap-3 w-full">
        <Button variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button onClick={onUpdate} className="flex-1">
          Update product
        </Button>
      </div>
    </SheetFooter>
  );
};
