
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddProductDialog = ({ open, onOpenChange }: AddProductDialogProps) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [inventory, setInventory] = useState("");
  const [stockPrediction, setStockPrediction] = useState("Insufficient data");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const getRandomOutOfStockDays = () => {
    const days = Math.floor(Math.random() * 7) + 1;
    return `Out of stock in ${days} days`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Determine stock prediction based on inventory if user selected "Auto"
    let finalStockPrediction = stockPrediction;
    if (stockPrediction === "Auto") {
      const inventoryValue = parseInt(inventory);
      if (inventoryValue <= 5) {
        finalStockPrediction = getRandomOutOfStockDays();
      } else if (inventoryValue <= 15) {
        finalStockPrediction = "Low stock";
      } else if (inventoryValue <= 50) {
        finalStockPrediction = "Stable stock";
      } else {
        finalStockPrediction = "Overstock stock";
      }
    }
    
    try {
      const { error } = await supabase.from("products").insert({
        name,
        price: `$${parseFloat(price).toFixed(2)}`,
        orders: "0",
        sales: "$0",
        inventory: parseInt(inventory),
        stock_prediction: finalStockPrediction
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Product added successfully",
      });

      queryClient.invalidateQueries({ queryKey: ["products"] });
      onOpenChange(false);
      setName("");
      setPrice("");
      setInventory("");
      setStockPrediction("Insufficient data");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add product",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="inventory">Inventory</Label>
            <Input
              id="inventory"
              type="number"
              min="0"
              value={inventory}
              onChange={(e) => setInventory(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stockPrediction">Stock Prediction</Label>
            <Select 
              value={stockPrediction} 
              onValueChange={setStockPrediction}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a stock prediction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Auto">Auto (based on inventory)</SelectItem>
                <SelectItem value={getRandomOutOfStockDays()}>Out of stock soon</SelectItem>
                <SelectItem value="Low stock">Low stock</SelectItem>
                <SelectItem value="Stable stock">Stable stock</SelectItem>
                <SelectItem value="Overstock stock">Overstock stock</SelectItem>
                <SelectItem value="Insufficient data">Insufficient data</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button 
              type="submit"
              style={{
                border: "1px solid #2D7048",
                backgroundColor: "#2D7048",
                boxShadow: "0px 2px 4px 0px rgba(78, 156, 84, 0.20)",
                borderRadius: "8px"
              }}
            >
              Save Product
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
