
import { supabase } from "@/integrations/supabase/client";
import { mockCustomers } from "@/data/mockCustomers";

export const migrateCustomersData = async () => {
  console.log("Starting migration of customer data to Supabase...");
  
  try {
    // Convert mock customers to the database format
    const customersToInsert = mockCustomers.map(customer => ({
      id: customer.id,
      customer_id: `#${customer.customerId}`,
      name: customer.name,
      company: customer.company,
      email: customer.email,
      avatar: customer.avatar,
      location: customer.location,
      orders: typeof customer.orders === "number" ? customer.orders.toString() : customer.orders,
      amount_spent: customer.amountSpent,
      subscription_status: customer.subscriptionStatus,
    }));
    
    // Insert data in batches to avoid request size limitations
    const batchSize = 20;
    for (let i = 0; i < customersToInsert.length; i += batchSize) {
      const batch = customersToInsert.slice(i, i + batchSize);
      
      const { data, error } = await supabase
        .from('customers')
        .upsert(batch, { onConflict: 'id' });
      
      if (error) {
        console.error(`Error inserting batch ${i / batchSize + 1}:`, error);
      } else {
        console.log(`Successfully inserted batch ${i / batchSize + 1}`);
      }
    }
    
    console.log("Migration completed successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
  }
};
