import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface ProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: {
    title: string;
    description?: string;
    images?: string[];
  };
}

export const ProductModal = ({ open, onOpenChange, product }: ProductModalProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[800px] sm:max-w-[800px] h-full overflow-y-auto">
        <SheetHeader className="space-y-6">
          <SheetTitle>{product.title}</SheetTitle>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={product.title} readOnly />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                value={product.description || 'No description available'} 
                readOnly 
                className="h-32"
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
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};