
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Customer } from "@/types/customer";
import { toast } from "sonner";

interface UseCustomersDataProps {
  searchQuery: string;
  sortDirection: "asc" | "desc";
}

export const useCustomersData = ({ searchQuery, sortDirection }: UseCustomersDataProps) => {
  const { data: customers = [], isLoading, error } = useQuery({
    queryKey: ['customers', sortDirection],
    queryFn: async () => {
      try {
        console.log(`Fetching customers with sort direction: ${sortDirection}`);
        
        // Fetch customers from Supabase
        const { data, error, count } = await supabase
          .from('customers')
          .select('*', { count: 'exact' })
          .order('amount_spent', { ascending: sortDirection === 'asc' });

        if (error) {
          console.error("Error fetching customers:", error);
          toast.error("Failed to load customers");
          throw error;
        }

        console.log(`Successfully fetched ${data.length} customers from database (total count: ${count})`);
        
        // Transform the data to match our Customer type
        return data.map((item): Customer => {
          // Handle N/A orders and ensure amount_spent is never 0 for N/A orders
          const orderValue = item.orders === "N/A" ? "N/A" : parseInt(item.orders || "0");
          let amountSpent = Number(item.amount_spent || 0);
          
          // Ensure we don't display N/A orders with $0 amount spent
          if (orderValue === "N/A" && amountSpent === 0) {
            amountSpent = 0;
          }

          return {
            id: item.id,
            customerId: parseInt(item.customer_id.replace('#', '')),
            name: item.name,
            company: item.company,
            email: item.email,
            avatar: item.avatar || `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? "men" : "women"}/${Math.floor(Math.random() * 100)}.jpg`,
            location: item.location,
            orders: orderValue,
            amountSpent: amountSpent,
            subscriptionStatus: item.subscription_status as any || "pending"
          };
        });
      } catch (err) {
        console.error("Failed to fetch customers:", err);
        return [];
      }
    },
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const filteredCustomers = customers.filter((customer) => {
    if (!searchQuery) return true;
    
    const searchLower = searchQuery.toLowerCase();
    return customer.name.toLowerCase().includes(searchLower) ||
      customer.email.toLowerCase().includes(searchLower) ||
      customer.company.toLowerCase().includes(searchLower) ||
      customer.location.toLowerCase().includes(searchLower);
  });

  return {
    customers: filteredCustomers,
    isLoading,
    error
  };
};
