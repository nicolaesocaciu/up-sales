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
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { X } from "lucide-react";
import { Json } from "@/integrations/supabase/types";
import { Checkbox } from "@/components/ui/checkbox";

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
  const [search, setSearch] = useState("");
  
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, price, category')
        .order('category', { ascending: true });
      
      if (error) throw error;
      return data || [];
    }
  });

  const filteredProducts = products?.filter(product => 
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.category.toLowerCase().includes(search.toLowerCase())
  ) || [];

  const groupedProducts = filteredProducts.reduce((acc, product) => {
    const category = product.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

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
        products: selectedProducts as unknown as Json[],
        item_count: selectedProducts.length
      };

      const { error } = await supabase.from('orders').insert(orderData);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Order added successfully"
      });

      setSelectedProducts([]);
      setCustomerName("");
      setCustomerEmail("");
      setStatus("Processing");
      setFulfillmentStatus("Unfulfilled");
      onOpenChange(false);

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
            <Command className="rounded-md border">
              <div 
                className="min-h-[40px] w-full rounded-t-md border-b border-input bg-transparent px-3 py-2 text-sm flex flex-wrap gap-1.5 items-center cursor-text"
              >
                {selectedProducts.map((product) => (
                  <span 
                    key={product.id}
                    className="inline-flex items-center gap-1 bg-secondary px-2 py-1 rounded-md text-sm"
                  >
                    {product.name}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProducts(prev => prev.filter(p => p.id !== product.id));
                      }}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="relative">
                <CommandInput 
                  placeholder="Search products..." 
                  value={search}
                  onValueChange={setSearch}
                  className="border-none focus:ring-0"
                />
                <CommandList className="max-h-[300px] overflow-auto absolute w-full bg-white border rounded-b-md shadow-lg">
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
                          className="flex items-center gap-2"
                        >
                          <Checkbox 
                            checked={selectedProducts.some(p => p.id === product.id)}
                            className="pointer-events-none"
                          />
                          <span>{product.name} - {product.price}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  ))}
                </CommandList>
              </div>
            </Command>
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
