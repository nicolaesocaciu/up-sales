
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { FulfillmentStatus, OrderStatus } from "@/types/order";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Json } from "@/integrations/supabase/types";
import { ProductSelector } from "./product-selector/ProductSelector";
import { calculateOrderValue } from "./utils/orderCalculations";

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
  
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleSubmit = async () => {
    try {
      const orderData = {
        items: selectedProducts.map(p => p.name).join(", "),
        customer_name: customerName,
        customer_email: customerEmail,
        value: `$${calculateOrderValue(selectedProducts)}`,
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
            <ProductSelector 
              selectedProducts={selectedProducts}
              onProductsChange={setSelectedProducts}
            />
            {selectedProducts.length > 0 && (
              <div className="text-sm text-muted-foreground">
                Total value: ${calculateOrderValue(selectedProducts)}
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
