
import { useState } from "react";
import { ServiceCard } from "../ui/ServiceCard";
import { ImportServicesProps, importUsersOrdersServices, Service } from "../types/serviceTypes";
import { UsersOrdersUploadForm } from "../forms/UsersOrdersUploadForm";
import { ShopifyForm } from "../forms/ShopifyForm";
import { WordpressForm } from "../forms/WordpressForm";
import { SalesforceForm } from "../forms/SalesforceForm";
import { ScrollArea } from "@/components/ui/scroll-area";

// Add descriptions for each service
const serviceDescriptions = {
  "shopify": "Import users and orders from your Shopify store",
  "wordpress": "Connect your WordPress WooCommerce store",
  "salesforce": "Sync data with your Salesforce CRM",
  "manual": "Upload users and orders data manually"
};

export const ImportUsersOrders = ({
  onNext,
  onBack
}: ImportServicesProps) => {
  const [services, setServices] = useState<Service[]>(importUsersOrdersServices);

  // Selected service
  const selectedService = services.find(service => service.selected);
  
  const toggleService = (id: string) => {
    setServices(services.map(service => ({
      ...service,
      selected: service.id === id
    })));
  };
  
  return (
    <div className="flex-1">
      <h1 className="mb-4 text-4xl font-normal">Import users and orders</h1>
      <p className="text-gray-600 mt-4 text-base mb-8">
        Interrogations will help you power up your CRM by connecting it with multiple 
        sources and it will become like comand center for your business. You can update 
        this option at any point in your settings.
      </p>

      <ScrollArea className="h-[500px] pr-4">
        <div className="flex flex-col w-full h-full">
          {services.map(service => (
            <ServiceCard 
              key={service.id} 
              title={service.name} 
              description={serviceDescriptions[service.id as keyof typeof serviceDescriptions]} 
              selected={service.selected} 
              onClick={() => toggleService(service.id)} 
              iconUrl={service.iconUrl} 
              isExpandable={true}
            >
              {service.id === "shopify" && <ShopifyForm />}
              {service.id === "wordpress" && <WordpressForm />}
              {service.id === "salesforce" && <SalesforceForm />}
              {service.id === "manual" && <UsersOrdersUploadForm />}
            </ServiceCard>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
