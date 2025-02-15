
import { useState } from "react";
import { Table, TableBody } from "../ui/table";
import { OrderTableHeader } from "./OrderTableHeader";
import { OrderTableHeaders } from "./OrderTableHeaders";
import { OrderRow } from "./OrderRow";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface OrdersTableProps {
  isEditMode?: boolean;
}

export const OrdersTable = ({ isEditMode }: OrdersTableProps) => {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const navigate = useNavigate();

  const { data: orders = [], refetch } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('date', { ascending: sortDirection === 'asc' });
      
      if (error) throw error;
      return data.slice(0, 6);
    },
  });

  const toggleSort = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  return (
    <div className="rounded-[24px] bg-white pb-6">
      <div className="flex items-center justify-between px-6 py-6">
        <h2 className="text-lg font-semibold">Latest orders</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => navigate('/orders')} 
            className="h-[40px] rounded-lg border-[#8A8A8A] bg-white text-text-dark"
          >
            View all
          </Button>
          <Button 
            onClick={() => navigate('/orders/new')} 
            className="h-[40px] rounded-lg bg-primary text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add manual order
          </Button>
        </div>
      </div>
      <div className="px-6">
        <Table>
          <OrderTableHeaders
            sortDirection={sortDirection}
            onToggleSort={toggleSort}
          />
          <TableBody>
            {orders.map((order) => (
              <OrderRow 
                key={order.id} 
                order={order}
                onDelete={refetch}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
