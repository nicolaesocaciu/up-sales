
export type DiscountStatus = "Active" | "Expired" | "Pending";

export type DiscountType = 
  | "PercentOff" 
  | "FixedAmount" 
  | "BOGO" 
  | "BulkDiscount" 
  | "NewCustomer" 
  | "HolidaySale"
  | "ReferralBonus";

export type DiscountMethod = 
  | "Code" 
  | "ValidateCode" 
  | "PromoCode" 
  | "RedeemOffer" 
  | "GetDiscount"
  | "CalculateFinal";

export interface Discount {
  id: string;
  title: string;
  description: string;
  method: DiscountMethod;
  type: DiscountType;
  typeDescription: string;
  status: DiscountStatus;
  combinations: string;
  used: number;
}
