
import { useState, useMemo } from "react";
import { Discount, DiscountStatus } from "@/types/discount";

// Mock discount data based on the reference image
const mockDiscounts: Discount[] = [
  {
    id: "disc-001",
    title: "Freeshipping20",
    description: "Freeshipping on all products for all countries",
    method: "Code",
    type: "PercentOff",
    typeDescription: "Shipping discount",
    status: "Active",
    combinations: "Order discounts",
    used: 465
  },
  {
    id: "disc-002",
    title: "Flash Sale - Up to 50% Off!",
    description: "For the next 24 hours, get up to 50% off",
    method: "ValidateCode",
    type: "FixedAmount",
    typeDescription: "Flat discount on the order total.",
    status: "Expired",
    combinations: "Bulk Purchase",
    used: 265
  },
  {
    id: "disc-003",
    title: "Fall Clearance - Save 40%",
    description: "Shop our exclusive fall clearance event and save 40%",
    method: "PromoCode",
    type: "BOGO",
    typeDescription: "Buy one, get one free promotion.",
    status: "Active",
    combinations: "Clearance Discounts",
    used: 460
  },
  {
    id: "disc-004",
    title: "Buy One, Get One Free!",
    description: "Purchase one item from our selected collection",
    method: "RedeemOffer",
    type: "PercentOff",
    typeDescription: "Shipping discount",
    status: "Expired",
    combinations: "Combination Offers",
    used: 466
  },
  {
    id: "disc-005",
    title: "Welcome Offer - 20% Off",
    description: "New here? Enjoy 20% off on your first order",
    method: "GetDiscount",
    type: "BulkDiscount",
    typeDescription: "Discount for purchasing in bulk.",
    status: "Pending",
    combinations: "Membership Offer",
    used: 499
  },
  {
    id: "disc-006",
    title: "Give $10, Get $10 – Refer a Friend!",
    description: "Refer a friend to our store, and both you and you",
    method: "Code",
    type: "NewCustomer",
    typeDescription: "Special discount",
    status: "Pending",
    combinations: "Shipping Discounts",
    used: 365
  },
  {
    id: "disc-007",
    title: "Free Shipping on Orders Over $50!",
    description: "Enjoy free standard shipping when you spend $50",
    method: "CalculateFinal",
    type: "HolidaySale",
    typeDescription: "Seasonal promotion for holiday",
    status: "Active",
    combinations: "Gift with Purchase",
    used: 433
  },
  {
    id: "disc-008",
    title: "Earn Points with Every Purchase",
    description: "Join our loyalty program to earn points on purchase",
    method: "RedeemOffer",
    type: "ReferralBonus",
    typeDescription: "Discount given for referring",
    status: "Expired",
    combinations: "Cross-Sell Discounts",
    used: 412
  }
];

export interface UseDiscountsDataProps {
  statusFilter: DiscountStatus | null;
  searchQuery: string;
  sortDirection: "asc" | "desc";
}

export const useDiscountsData = ({ statusFilter, searchQuery, sortDirection }: UseDiscountsDataProps) => {
  const [discounts] = useState<Discount[]>(mockDiscounts);

  const filteredDiscounts = useMemo(() => {
    return discounts.filter((discount) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = searchQuery === "" || 
        discount.title.toLowerCase().includes(searchLower) ||
        discount.description.toLowerCase().includes(searchLower);

      let matchesStatusFilter = true;
      
      if (statusFilter) {
        matchesStatusFilter = discount.status === statusFilter;
      }

      return matchesSearch && matchesStatusFilter;
    });
  }, [discounts, searchQuery, statusFilter]);

  // Sort the filtered discounts
  const sortedDiscounts = useMemo(() => {
    return [...filteredDiscounts].sort((a, b) => {
      if (sortDirection === 'asc') {
        return a.used - b.used;
      } else {
        return b.used - a.used;
      }
    });
  }, [filteredDiscounts, sortDirection]);

  // Get counts by status for filter badges
  const statusCounts = useMemo(() => {
    const counts = {
      Active: 0,
      Expired: 0,
      Pending: 0,
    };

    discounts.forEach(discount => {
      counts[discount.status]++;
    });

    return counts;
  }, [discounts]);

  return {
    discounts,
    filteredDiscounts: sortedDiscounts,
    isLoading: false,
    statusCounts
  };
};
