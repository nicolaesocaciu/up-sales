
export type CampaignType = "Email marketing" | "Business marketing" | "e-commerce marketing";
export type CampaignStatus = "Sent" | "Draft";

export interface Campaign {
  id: string;
  name: string;
  type: CampaignType;
  status: CampaignStatus;
  lastUpdated: string;
  openRate: {
    value: number;
    count: number;
  };
  subscribedRate: {
    value: number;
    count: number;
  };
  activeRate: {
    value: number;
    count: number;
  };
  thumbnail?: string;
}
