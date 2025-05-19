
export type Service = {
  id: string;
  name: string;
  selected: boolean;
  iconUrl: string;
};

export type ImportServicesProps = {
  onNext: () => void;
  onBack: () => void;
};

export const importProductServices: Service[] = [{
  id: "shopify",
  name: "Shopify",
  selected: false,
  iconUrl: "https://cdn.worldvectorlogo.com/logos/shopify.svg"
}, {
  id: "wordpress",
  name: "Wordpress",
  selected: false,
  iconUrl: "/lovable-uploads/39174503-5fba-4f20-b309-a672aec16aa3.png"
}, {
  id: "salesforce",
  name: "Salesforce",
  selected: false,
  iconUrl: "https://cdn.worldvectorlogo.com/logos/salesforce-2.svg"
}, {
  id: "manual",
  name: "Manual",
  selected: false,
  iconUrl: ""
}];
