
import { supabase } from "@/integrations/supabase/client";
import { mockCustomers } from "@/data/mockCustomers";
import { toast } from "sonner";

export const migrateCustomersData = async () => {
  console.log("Starting migration of customer data to Supabase...");
  
  try {
    // Check if we already have data in the database
    const { count, error: countError } = await supabase
      .from('customers')
      .select('*', { count: 'exact', head: true });
    
    if (countError) {
      console.error("Error checking existing customers:", countError);
      return;
    }
    
    console.log(`Found ${count} existing customer records`);
    
    // Only proceed if there are fewer than 90 records (suggesting additional records haven't been added yet)
    if (count && count >= 90) {
      console.log("Database already has sufficient customer records. Skipping migration.");
      return;
    }
    
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
    
    // Generate 80 additional customers
    const additionalCustomers = Array.from({ length: 80 }, (_, i) => {
      const randomId = Math.random().toString(36).substring(2, 15);
      const customerId = Math.floor(10000 + Math.random() * 90000);
      const gender = Math.random() > 0.5 ? "men" : "women";
      const portraitNumber = Math.floor(Math.random() * 70) + 10;
      const subscriptionOptions = ["subscribed", "not_subscribed", "pending"];
      const randomSubscription = subscriptionOptions[Math.floor(Math.random() * subscriptionOptions.length)];
      
      const companyNames = ["Acme Inc", "Globex Corp", "Initech", "Massive Dynamic", "Cyberdyne Systems", 
                            "Wayne Enterprises", "Stark Industries", "Umbrella Corporation", "Oscorp", 
                            "LexCorp", "Soylent Corp", "Weyland-Yutani", "Tyrell Corp", "Aperture Science",
                            "Virtucon", "Xanatos Enterprises", "Wonka Industries", "Rekall", "Spacely Sprockets",
                            "Contoso Ltd"];
      
      const cityNames = ["Springfield", "Riverdale", "South Park", "Metropolis", "Gotham", 
                        "Star City", "Central City", "Smallville", "Night City", "Los Santos", 
                        "Liberty City", "Raccoon City", "Silent Hill", "Hill Valley", "Twin Peaks",
                        "Pawnee", "Derry", "Hawkins", "Sunnydale", "Fargo"];
      
      const stateNames = ["California", "Texas", "Florida", "New York", "Pennsylvania", 
                         "Illinois", "Ohio", "Georgia", "North Carolina", "Michigan", 
                         "New Jersey", "Virginia", "Washington", "Arizona", "Massachusetts",
                         "Tennessee", "Indiana", "Maryland", "Missouri", "Wisconsin"];
      
      const firstNames = ["John", "Jane", "Michael", "Emily", "David", 
                         "Sarah", "Robert", "Mary", "William", "Patricia", 
                         "James", "Jennifer", "Charles", "Linda", "Joseph",
                         "Elizabeth", "Thomas", "Barbara", "Daniel", "Susan"];
      
      const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", 
                        "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", 
                        "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson",
                        "Thomas", "Taylor", "Moore", "Jackson", "Martin"];

      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const name = `${firstName} ${lastName}`;
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
      const company = companyNames[Math.floor(Math.random() * companyNames.length)];
      const city = cityNames[Math.floor(Math.random() * cityNames.length)];
      const state = stateNames[Math.floor(Math.random() * stateNames.length)];
      
      const orderOptions = ["N/A", "1", "2", "3", "4", "5", "6", "7", "8"];
      const orderCount = orderOptions[Math.floor(Math.random() * orderOptions.length)];
      
      let amountSpent = 0;
      if (orderCount !== "N/A") {
        amountSpent = Math.floor(Math.random() * 1000) + 50;
      }
      
      return {
        id: randomId,
        customer_id: `#${customerId}`,
        name: name,
        company: company,
        email: email,
        avatar: `https://randomuser.me/api/portraits/${gender}/${portraitNumber}.jpg`,
        location: `${city}, ${state}`,
        orders: orderCount,
        amount_spent: amountSpent,
        subscription_status: randomSubscription,
      };
    });
    
    // Combine original and additional customers
    const allCustomers = [...customersToInsert, ...additionalCustomers];
    
    // Insert data in batches to avoid request size limitations
    const batchSize = 20;
    let successfulBatches = 0;
    
    for (let i = 0; i < allCustomers.length; i += batchSize) {
      const batch = allCustomers.slice(i, i + batchSize);
      
      const { error } = await supabase
        .from('customers')
        .upsert(batch, { onConflict: 'id' });
      
      if (error) {
        console.error(`Error inserting batch ${i / batchSize + 1}:`, error);
      } else {
        console.log(`Successfully inserted batch ${i / batchSize + 1}`);
        successfulBatches++;
      }
    }
    
    // Get count after migration to verify
    const { count: newCount, error: newCountError } = await supabase
      .from('customers')
      .select('*', { count: 'exact', head: true });
      
    if (newCountError) {
      console.error("Error checking customers after migration:", newCountError);
    } else {
      console.log(`Database now has ${newCount} customer records`);
      
      if (newCount > count) {
        toast.success(`Successfully added ${newCount - count} new customer records`);
      }
    }
    
    console.log("Migration completed successfully!");
    
    // Mark as migrated only if we reached the expected number of records
    if (newCount && newCount >= 90) {
      localStorage.setItem('customersMigrated', 'true');
    }
  } catch (error) {
    console.error("Migration failed:", error);
    toast.error("Failed to add customer records");
  }
};
