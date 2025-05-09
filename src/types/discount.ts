
export type DiscountStatus = "Active" | "Expired" | "Pending";
export type DiscountMethod = "Code" | "ValidateCode" | "PromoCode" | "RedeemOffer" | "GetDiscount" | "CalculateFinal";
export type DiscountType = 
  | "PercentOff" 
  | "FixedAmount" 
  | "BOGO" 
  | "BulkDiscount" 
  | "NewCustomer" 
  | "HolidaySale" 
  | "ReferralBonus";

export interface Discount {
  id: string;
  title: string;
  description: string;
  method: DiscountMethod;
  type: DiscountType;
  status: DiscountStatus;
  combinations: string;
  used: number;
  typeDescription: string;
}
