
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { FulfillmentStatus, OrderStatus } from "@/types/order";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Check } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
}

interface AddOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddOrderDialog = ({
  open,
  onOpenChange
}: AddOrderDialogProps) => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [status, setStatus] = useState<OrderStatus>("Processing");
  const [fulfillmentStatus, setFulfillmentStatus] = useState<FulfillmentStatus>("Unfulfilled");
  const [commandOpen, setCommandOpen] = useState(false);
  
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch products from database
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, price, category')
        .order('category', { ascending: true });
      
      if (error) throw error;
      return data;
    }
  });

  // Group products by category
  const groupedProducts = products?.reduce((acc, product) => {
    const category = product.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {} as Record<string, Product[]>) || {};

  // Calculate total order value
  const calculateOrderValue = () => {
    return selectedProducts.reduce((total, product) => {
      const price = parseFloat(product.price.replace(/[^0-9.]/g, ''));
      return total + price;
    }, 0).toFixed(2);
  };

  const handleSubmit = async () => {
    try {
      const orderData = {
        items: selectedProducts.map(p => p.name).join(", "),
        customer_name: customerName,
        customer_email: customerEmail,
        value: `$${calculateOrderValue()}`,
        status,
        fulfillment_status: fulfillmentStatus,
        products: selectedProducts as unknown as Json,
        item_count: selectedProducts.length
      };

      const { error } = await supabase.from('orders').insert(orderData);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Order added successfully"
      });

      // Reset form
      setSelectedProducts([]);
      setCustomerName("");
      setCustomerEmail("");
      setStatus("Processing");
      setFulfillmentStatus("Unfulfilled");

      // Close dialog
      onOpenChange(false);

      // Refresh orders list
      queryClient.invalidateQueries({
        queryKey: ['orders']
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add order",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add manual order</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Products</Label>
            <div className="relative">
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={commandOpen}
                className="w-full justify-between"
                onClick={() => setCommandOpen(!commandOpen)}
              >
                {selectedProducts.length === 0 
                  ? "Select products..." 
                  : `${selectedProducts.length} products selected`}
              </Button>
              {commandOpen && (
                <Command className="absolute top-full left-0 right-0 z-50 mt-1 rounded-md border bg-popover text-popover-foreground shadow-md">
                  <CommandInput placeholder="Search products..." />
                  <CommandEmpty>No products found.</CommandEmpty>
                  {!isLoading && Object.entries(groupedProducts).map(([category, categoryProducts]) => (
                    <CommandGroup key={category} heading={category}>
                      {categoryProducts.map((product) => (
                        <CommandItem
                          key={product.id}
                          onSelect={() => {
                            setSelectedProducts(prev => {
                              const isSelected = prev.some(p => p.id === product.id);
                              if (isSelected) {
                                return prev.filter(p => p.id !== product.id);
                              }
                              return [...prev, product];
                            });
                          }}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span>{product.name} - {product.price}</span>
                            {selectedProducts.some(p => p.id === product.id) && (
                              <Check className="h-4 w-4" />
                            )}
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  ))}
                </Command>
              )}
            </div>
            {selectedProducts.length > 0 && (
              <div className="text-sm text-muted-foreground">
                Total value: ${calculateOrderValue()}
              </div>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="customerName">Customer Name</Label>
            <Input 
              id="customerName" 
              value={customerName} 
              onChange={e => setCustomerName(e.target.value)} 
              placeholder="Enter customer name" 
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="customerEmail">Customer Email</Label>
            <Input 
              id="customerEmail" 
              value={customerEmail} 
              onChange={e => setCustomerEmail(e.target.value)} 
              type="email" 
              placeholder="Enter customer email" 
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={value => setStatus(value as OrderStatus)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Waiting">Waiting</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="fulfillmentStatus">Fulfillment Status</Label>
            <Select value={fulfillmentStatus} onValueChange={value => setFulfillmentStatus(value as FulfillmentStatus)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Fulfilled">Fulfilled</SelectItem>
                <SelectItem value="Unfulfilled">Unfulfilled</SelectItem>
                <SelectItem value="Unpaid">Unpaid</SelectItem>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={selectedProducts.length === 0 || !customerName || !customerEmail}
          >
            Save Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
