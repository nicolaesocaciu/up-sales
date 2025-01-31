import { Button } from "../ui/button";

export const OrderTableHeader = () => {
  return (
    <div className="flex items-center justify-between px-6 py-6">
      <h2 className="text-lg font-semibold">Latest orders</h2>
      <Button 
        variant="outline" 
        className="text-primary hover:bg-primary/5"
      >
        View all
      </Button>
    </div>
  );
};