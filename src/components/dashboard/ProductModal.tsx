import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Copy, Eye, X } from "lucide-react";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { useEffect } from "react";
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
  const handleCloseClick = () => {
    onOpenChange(false);
  };
  return <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[800px] sm:max-w-[800px] h-full overflow-y-auto rounded-tl-[24px] rounded-bl-[24px] bg-white p-12" onInteractOutside={() => onOpenChange(false)} // Close when clicking outside
    onEscapeKeyDown={() => onOpenChange(false)} // Explicitly handle ESC key
    >
        <div className="flex flex-col h-full">
          <SheetHeader className="space-y-6">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-2xl font-bold text-text-dark">{product.title}</SheetTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleCloseClick}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-6 mb-3 ">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={product.title} readOnly />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" value={product.description || 'No description available'} readOnly className="h-32 min-h-[80px]" />
              </div>

              <div>
                <Label>Images</Label>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  {product.images?.map((image, index) => <img key={index} src={image} alt={`Product ${index + 1}`} className="w-full h-48 object-cover rounded-lg border" />)}
                  <div className="border-2 border-dashed rounded-lg flex items-center justify-center h-48">
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Add images</p>
                      <p className="text-xs text-gray-400">or drop files to upload</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Product availability</h3>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">Available on 1 of 1 channels and apps</p>
                  <Button variant="link" className="text-[#116fae]">
                    Manage
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <p className="font-medium">Online Store</p>
                  <Button variant="outline" className="w-full justify-start">
                    <span className="text-gray-500">Select sales channel</span>
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4 mb-3">
                <h3 className="font-semibold text-lg">Organization</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="productType">Product type</Label>
                  <Input id="productType" value={product.productType || ''} placeholder="e.g. Shirts" readOnly />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vendor">Vendor</Label>
                  <Input id="vendor" value={product.vendor || ''} readOnly />
                </div>

                <div className="space-y-2">
                  <Label>Collections</Label>
                  <div className="flex flex-wrap gap-2">
                    {product.collections?.map((collection, index) => <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {collection}
                        <X className="h-3 w-3" />
                      </Badge>)}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Tags</Label>
                    <Button variant="link" className="text-[#116fae]">
                      View all tags
                    </Button>
                  </div>
                  <Input value={product.tags?.join(', ') || ''} placeholder="Vintage, cotton, summer" readOnly />
                </div>
              </div>
            </div>
          </SheetHeader>
        </div>
      </SheetContent>
    </Sheet>;
};