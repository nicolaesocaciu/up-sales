
import { Customer, SubscriptionStatus } from "@/types/customer";

// List of company name prefixes and suffixes for generating company names
const companyPrefixes = [
  "Alpha", "Beta", "Gamma", "Delta", "Omega", "Nova", "Apex", "Prime", "Eco", "Cyber",
  "Tech", "Global", "Future", "Smart", "Creative", "Dynamic", "Elite", "Superior", "Unified", "Innovative"
];

const companySuffixes = [
  "Corp", "Inc", "LLC", "Group", "Systems", "Solutions", "Consulting", "Industries", "Enterprises", "Technologies",
  "Networks", "Logistics", "Partners", "Labs", "Media", "Dynamics", "Innovations", "Services", "International", "Co"
];

// Sample data from the image
const sampleCustomers: Partial<Customer>[] = [
  {
    name: "Esther Howard",
    location: "Great Falls, Maryland",
    orders: 2,
    amountSpent: 250.00,
    subscriptionStatus: "subscribed"
  },
  {
    name: "Leslie Alexander",
    location: "Pasadena, Oklahoma",
    orders: 3,
    amountSpent: 350.00,
    subscriptionStatus: "not_subscribed"
  },
  {
    name: "Guy Hawkins",
    location: "Corona, Michigan",
    orders: "N/A",
    amountSpent: 0.00,
    subscriptionStatus: "pending"
  },
  {
    name: "Savannah Nguyen",
    location: "Syracuse, Connecticut",
    orders: "N/A",
    amountSpent: 0.00,
    subscriptionStatus: "subscribed"
  },
  {
    name: "Bessie Cooper",
    location: "Lansing, Illinois",
    orders: 1,
    amountSpent: 470.00,
    subscriptionStatus: "not_subscribed"
  },
  {
    name: "Ronald Richards",
    location: "Great Falls, Maryland",
    orders: 2,
    amountSpent: 250.00,
    subscriptionStatus: "pending"
  },
  {
    name: "Marvin McKinney",
    location: "Coppell, Virginia",
    orders: 2,
    amountSpent: 150.00,
    subscriptionStatus: "subscribed"
  },
  {
    name: "Kathryn Murphy",
    location: "Lafayette, California",
    orders: 3,
    amountSpent: 250.00,
    subscriptionStatus: "not_subscribed"
  },
  {
    name: "Eleanor Pena",
    location: "Corona, Michigan",
    orders: 1,
    amountSpent: 250.00,
    subscriptionStatus: "pending"
  }
];

// Generate a random company name
const generateCompanyName = (): string => {
  const prefix = companyPrefixes[Math.floor(Math.random() * companyPrefixes.length)];
  const suffix = companySuffixes[Math.floor(Math.random() * companySuffixes.length)];
  return `${prefix} ${suffix}`;
};

// Generate a random customer ID between 10000 and 99999
const generateCustomerId = (): number => {
  return Math.floor(Math.random() * 90000) + 10000;
};

// First names for generating random customer names
const firstNames = [
  "James", "Mary", "Robert", "Patricia", "John", "Jennifer", "Michael", "Linda", 
  "David", "Elizabeth", "William", "Susan", "Richard", "Jessica", "Joseph", "Sarah", 
  "Thomas", "Karen", "Charles", "Nancy", "Christopher", "Lisa", "Daniel", "Betty", 
  "Matthew", "Dorothy", "Anthony", "Sandra", "Mark", "Ashley", "Donald", "Kimberly", 
  "Steven", "Donna", "Paul", "Emily", "Andrew", "Michelle", "Joshua", "Carol", 
  "Kenneth", "Amanda", "Kevin", "Melissa", "Brian", "Deborah", "George", "Stephanie"
];

// Last names for generating random customer names
const lastNames = [
  "Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", 
  "Moore", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", 
  "Thompson", "Garcia", "Martinez", "Robinson", "Clark", "Rodriguez", "Lewis", 
  "Lee", "Walker", "Hall", "Allen", "Young", "Hernandez", "King", "Wright", "Lopez", 
  "Hill", "Scott", "Green", "Adams", "Baker", "Gonzalez", "Nelson", "Carter", 
  "Mitchell", "Perez", "Roberts", "Turner", "Phillips", "Campbell", "Parker", "Evans"
];

// Cities and states for US locations
const cities = [
  "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", 
  "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville", 
  "Fort Worth", "Columbus", "San Francisco", "Charlotte", "Indianapolis", "Seattle", 
  "Denver", "Washington", "Boston", "Nashville", "Baltimore", "Oklahoma City", 
  "Louisville", "Portland", "Las Vegas", "Milwaukee", "Albuquerque", "Tucson", 
  "Fresno", "Sacramento", "Long Beach", "Kansas City", "Mesa", "Atlanta", "Omaha", 
  "Raleigh", "Miami", "Oakland", "Minneapolis", "Tulsa", "Cleveland", "Wichita", 
  "Arlington", "New Orleans", "Bakersfield", "Tampa", "Aurora", "Anaheim"
];

const states = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", 
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", 
  "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", 
  "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", 
  "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", 
  "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", 
  "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", 
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

// International locations
const internationalLocations = [
  "London, UK", "Paris, France", "Berlin, Germany", "Madrid, Spain", "Rome, Italy",
  "Tokyo, Japan", "Sydney, Australia", "Toronto, Canada", "Mexico City, Mexico",
  "São Paulo, Brazil", "Mumbai, India", "Shanghai, China", "Seoul, South Korea",
  "Cairo, Egypt", "Lagos, Nigeria", "Cape Town, South Africa", "Stockholm, Sweden",
  "Oslo, Norway", "Copenhagen, Denmark", "Helsinki, Finland", "Amsterdam, Netherlands",
  "Brussels, Belgium", "Vienna, Austria", "Zurich, Switzerland", "Dublin, Ireland"
];

// Generate a random customer
const generateRandomCustomer = (id: string): Customer => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const name = `${firstName} ${lastName}`;
  
  // 70% chance of US location, 30% chance of international
  const isInternational = Math.random() < 0.3;
  const location = isInternational
    ? internationalLocations[Math.floor(Math.random() * internationalLocations.length)]
    : `${cities[Math.floor(Math.random() * cities.length)]}, ${states[Math.floor(Math.random() * states.length)]}`;
  
  // Generate subscription status with distribution: 40% subscribed, 35% not subscribed, 25% pending
  const rand = Math.random();
  let subscriptionStatus: SubscriptionStatus;
  if (rand < 0.4) {
    subscriptionStatus = "subscribed";
  } else if (rand < 0.75) {
    subscriptionStatus = "not_subscribed";
  } else {
    subscriptionStatus = "pending";
  }
  
  // If subscribed or not subscribed, likely has orders
  let orders: number | "N/A" = "N/A";
  let amountSpent = 0;
  
  if (subscriptionStatus !== "pending" || Math.random() < 0.2) {
    // Generate between 0 and 10 orders, with most having 1-3
    const orderCount = Math.floor(Math.random() * 10) + 1;
    orders = orderCount > 0 ? orderCount : "N/A";
    
    if (orders !== "N/A") {
      // Generate amount spent based on number of orders
      const baseAmount = 100 + Math.floor(Math.random() * 300);
      amountSpent = orders * baseAmount;
      
      // Add some variability
      amountSpent = Math.round(amountSpent * (0.8 + Math.random() * 0.4));
    }
  }
  
  // Generate random avatar URL from UI Faces
  const gender = Math.random() > 0.5 ? "men" : "women";
  const avatarId = Math.floor(Math.random() * 100);
  const avatar = `https://randomuser.me/api/portraits/${gender}/${avatarId}.jpg`;
  
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
  const company = generateCompanyName();
  const customerId = generateCustomerId();
  
  return {
    id,
    customerId,
    name,
    company,
    email,
    avatar,
    location,
    orders,
    amountSpent,
    subscriptionStatus
  };
};

// Generate 80 random customers
export const generateMockCustomers = (): Customer[] => {
  // Start with the sample customers
  const customers: Customer[] = sampleCustomers.map((customer, index) => ({
    id: `sample-${index + 1}`,
    customerId: generateCustomerId(),
    name: customer.name || "Unknown",
    company: generateCompanyName(),
    email: `${customer.name?.toLowerCase().replace(' ', '.')}@example.com` || "unknown@example.com",
    avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? "men" : "women"}/${index}.jpg`,
    location: customer.location || "Unknown",
    orders: customer.orders || 0,
    amountSpent: customer.amountSpent || 0,
    subscriptionStatus: customer.subscriptionStatus || "pending"
  }));
  
  // Generate additional customers to reach a total of 80
  for (let i = customers.length; i < 80; i++) {
    customers.push(generateRandomCustomer(`customer-${i + 1}`));
  }
  
  return customers;
};

// Create and export the mock customers dataset
export const mockCustomers = generateMockCustomers();
