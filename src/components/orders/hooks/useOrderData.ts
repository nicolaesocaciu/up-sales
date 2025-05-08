
import { useQuery } from "@tanstack/react-query";
import { Order } from "@/types/order";
import { supabase } from "@/integrations/supabase/client";
import { OrderItem } from "../types/orderTypes";

export const useOrderData = (order: Order | undefined, isDrawerOpen: boolean) => {
  // Get products data from the database for this order
  const { data: productData } = useQuery({
    queryKey: ['orderProducts', order?.id],
    queryFn: async () => {
      if (!order?.products || order.products.length === 0) {
        return [];
      }
      
      // Extract product names/titles
      const productTitles = order.products.map(p => p.title);
      
      // Fetch matching products from database
      const { data } = await supabase
        .from('products')
        .select('*')
        .in('name', productTitles);
        
      return data || [];
    },
    enabled: isDrawerOpen && !!order?.products && order.products.length > 0
  });

  if (!order) return { displayItems: [], subtotal: 0, shippingCost: 0, total: 0, formattedDate: '' };

  // Map order products to order items with quantity and price info
  const items: OrderItem[] = order.products?.map((product, index) => {
    // Look for matching product in database results
    const matchedProduct = productData?.find(p => p.name === product.title);
    
    // Use the price from the matched product in the database
    const price = matchedProduct?.price || "$0.00";
    const quantity = 1; // Default quantity
    
    // Calculate total based on price and quantity
    // First, clean the price string to extract just the number
    const numericPrice = parseFloat(price.replace(/[^0-9.-]+/g, "")) || 0;
    const totalValue = numericPrice * quantity;
    
    // Format the total as currency
    const total = formatCurrency(totalValue);
    
    return {
      name: product.title,
      sku: matchedProduct?.id || `SKU-${index}`,
      price: price,
      quantity: quantity,
      total: total,
      image: product.images?.[0] || order.thumbnail || "/lovable-uploads/6ec4fac8-f096-4716-b534-ea9b39c16b97.png"
    };
  }) || [];

  // If no items are defined yet (waiting for query), show placeholder items based on order info
  const displayItems = items.length > 0 ? items : [{
    name: order.items,
    sku: "SKU-0",
    price: order.value,
    quantity: order.itemCount || 1,
    total: order.value,
    image: order.thumbnail || "/lovable-uploads/6ec4fac8-f096-4716-b534-ea9b39c16b97.png"
  }];
  
  // Calculate total from items
  const subtotal = displayItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.-]+/g, "")) || 0;
    return sum + (price * item.quantity);
  }, 0);
  
  const shippingCost = 16;
  const total = subtotal + shippingCost;

  // Format the order date to match the design
  const formattedDate = new Date(order.date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }) + " at " + new Date(order.date).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  return {
    displayItems,
    subtotal,
    shippingCost,
    total,
    formattedDate
  };
};

// Format currency helper
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};
