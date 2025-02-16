
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

interface AddOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddOrderDialog = ({ open, onOpenChange }: AddOrderDialogProps) => {
  const [items, setItems] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<OrderStatus>("Processing");
  const [fulfillmentStatus, setFulfillmentStatus] = useState<FulfillmentStatus>("Unfulfilled");
  
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleSubmit = async () => {
    try {
      const { error } = await supabase
        .from('orders')
        .insert([
          {
            items,
            customer_name: customerName,
            customer_email: customerEmail,
            value,
            status,
            fulfillment_status: fulfillmentStatus,
          }
        ]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Order added successfully",
      });

      // Reset form
      setItems("");
      setCustomerName("");
      setCustomerEmail("");
      setValue("");
      setStatus("Processing");
      setFulfillmentStatus("Unfulfilled");

      // Close dialog
      onOpenChange(false);

      // Refresh orders list
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add order",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Manual Order</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="items">Items</Label>
            <Input
              id="items"
              value={items}
              onChange={(e) => setItems(e.target.value)}
              placeholder="Enter items"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="customerName">Customer Name</Label>
            <Input
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter customer name"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="customerEmail">Customer Email</Label>
            <Input
              id="customerEmail"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              type="email"
              placeholder="Enter customer email"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="value">Order Value</Label>
            <Input
              id="value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter order value"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={(value) => setStatus(value as OrderStatus)}>
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
            <Select value={fulfillmentStatus} onValueChange={(value) => setFulfillmentStatus(value as FulfillmentStatus)}>
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
          <Button onClick={handleSubmit}>Save Order</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
