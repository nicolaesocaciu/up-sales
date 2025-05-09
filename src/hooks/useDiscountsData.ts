
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Discount } from "@/types/discount";

// Mock data based on the image reference
const mockDiscounts: Discount[] = [
  {
    id: "1",
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
    id: "2",
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
    id: "3",
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
    id: "4",
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
    id: "5",
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
    id: "6",
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
    id: "7",
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
    id: "8",
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
  statusFilter: string | null;
  searchQuery: string;
  sortDirection: "asc" | "desc";
}

export const useDiscountsData = ({ statusFilter, searchQuery, sortDirection }: UseDiscountsDataProps) => {
  const { data: discounts = [], isLoading } = useQuery({
    queryKey: ['discounts', sortDirection],
    queryFn: async () => {
      // In a real app, this would be an API call to fetch discounts
      return mockDiscounts;
    },
  });

  const filteredDiscounts = useMemo(() => {
    return discounts.filter((discount) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = searchQuery === "" || 
        discount.title.toLowerCase().includes(searchLower) ||
        discount.description.toLowerCase().includes(searchLower);

      let matchesStatusFilter = true;
      
      if (statusFilter) {
        if (statusFilter === "active") {
          matchesStatusFilter = discount.status === "Active";
        } else if (statusFilter === "expired") {
          matchesStatusFilter = discount.status === "Expired";
        } else if (statusFilter === "pending") {
          matchesStatusFilter = discount.status === "Pending";
        }
      }

      return matchesSearch && matchesStatusFilter;
    });
  }, [discounts, searchQuery, statusFilter]);

  // Sort discounts based on direction
  const sortedDiscounts = useMemo(() => {
    return [...filteredDiscounts].sort((a, b) => {
      if (sortDirection === "asc") {
        return a.used - b.used;
      } else {
        return b.used - a.used;
      }
    });
  }, [filteredDiscounts, sortDirection]);

  return {
    discounts,
    filteredDiscounts: sortedDiscounts,
    isLoading
  };
};
