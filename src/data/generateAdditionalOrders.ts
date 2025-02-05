import { Order, OrderStatus, FulfillmentStatus } from "@/types/order";

const techProducts = [
  { name: "MacBook Pro 16-inch", price: 2499 },
  { name: "iPhone 15 Pro Max", price: 1199 },
  { name: "iPad Pro 12.9-inch", price: 1099 },
  { name: "AirPods Pro", price: 249 },
  { name: "Mac Studio", price: 1999 },
  { name: "Apple Watch Ultra", price: 799 },
  { name: "Sony WH-1000XM5", price: 399 },
  { name: "Dell XPS 15", price: 1899 },
  { name: "Samsung Galaxy S24 Ultra", price: 1299 },
  { name: "Microsoft Surface Laptop 5", price: 999 }
];

const firstNames = [
  "Emma", "Liam", "Olivia", "Noah", "Ava", "Ethan", "Sophia", "Mason",
  "Isabella", "William", "Mia", "James", "Charlotte", "Benjamin", "Amelia",
  "Lucas", "Harper", "Henry", "Evelyn", "Alexander"
];

const lastNames = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller",
  "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez",
  "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"
];

const statuses: OrderStatus[] = ["Paid", "Processing", "Waiting"];
const fulfillmentStatuses: FulfillmentStatus[] = ["Fulfilled", "Unfulfilled", "Unpaid", "Open", "Closed"];

const getRandomElement = <T>(array: T[]): T => 
  array[Math.floor(Math.random() * array.length)];

const generateRandomProducts = (maxProducts: number = 3) => {
  const numProducts = Math.floor(Math.random() * maxProducts) + 1;
  const selectedProducts = [];
  let totalValue = 0;
  
  for (let i = 0; i < numProducts; i++) {
    const product = getRandomElement(techProducts);
    selectedProducts.push(product);
    totalValue += product.price;
  }
  
  return {
    items: selectedProducts.map(p => p.name).join(", "),
    value: `$${totalValue.toLocaleString()}`,
    products: selectedProducts.map(p => ({
      title: p.name,
      description: `High-end tech device - ${p.name}`,
      images: [
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop"
      ]
    }))
  };
};

const generateCustomer = () => {
  const firstName = getRandomElement(firstNames);
  const lastName = getRandomElement(lastNames);
  const name = `${firstName} ${lastName}`;
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
  return { name, email };
};

export const generateAdditionalOrders = (count: number): Order[] => 
  Array.from({ length: count }, (_, index) => {
    const { items, value, products } = generateRandomProducts();
    const customer = generateCustomer();
    
    return {
      id: `#${44400 + index}`,
      date: "25 Jan 2025",
      items,
      value,
      status: getRandomElement(statuses),
      fulfillmentStatus: getRandomElement(fulfillmentStatuses),
      customer,
      thumbnail: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=24&h=24&fit=crop",
      itemCount: products.length,
      products
    };
  });