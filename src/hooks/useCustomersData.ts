
import { supabase } from "@/integrations/supabase/client";
import { Customer } from "@/types/customer";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useCustomersData = () => {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const fetchCustomers = async () => {
    let query = supabase
      .from("customers")
      .select("*");
      
    const { data, error } = await query;

    if (error) {
      console.error("Error fetching customers:", error);
      throw new Error("Failed to fetch customers");
    }

    // Transform the data to match our Customer type
    const customers: Customer[] = data.map((item) => ({
      id: item.id,
      customerId: parseInt(item.customer_id.replace('#', '')),
      name: item.name,
      company: item.company,
      email: item.email,
      avatar: item.avatar || `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? "men" : "women"}/${Math.floor(Math.random() * 100)}.jpg`,
      location: item.location,
      orders: item.orders === 'N/A' ? 'N/A' : parseInt(item.orders),
      amountSpent: parseFloat(item.amount_spent),
      subscriptionStatus: item.subscription_status as "subscribed" | "not_subscribed" | "pending",
    }));

    // Sort customers by amount spent
    const sortedCustomers = [...customers].sort((a, b) => {
      return sortDirection === "asc" ? a.amountSpent - b.amountSpent : b.amountSpent - a.amountSpent;
    });

    return sortedCustomers;
  };

  const { data = [], isLoading, error, refetch } = useQuery({
    queryKey: ["customers", sortDirection],
    queryFn: fetchCustomers,
  });

  return {
    customers: data,
    isLoading,
    error,
    refetch,
    sortDirection,
    setSortDirection,
  };
};
