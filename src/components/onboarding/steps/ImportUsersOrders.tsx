
import { useState } from "react";
import { ServiceCard } from "../ui/ServiceCard";
import { ImportServicesProps, importUsersOrdersServices, Service } from "../types/serviceTypes";
import { UsersOrdersUploadForm } from "../forms/UsersOrdersUploadForm";
import { ShopifyForm } from "../forms/ShopifyForm";
import { WordpressForm } from "../forms/WordpressForm";
import { SalesforceForm } from "../forms/SalesforceForm";
import { ScrollArea } from "@/components/ui/scroll-area";

export const ImportUsersOrders = ({
  onNext,
  onBack
}: ImportServicesProps) => {
  const [services, setServices] = useState<Service[]>(importUsersOrdersServices.map(service => ({
    ...service,
    description: getServiceDescription(service.id)
  })));
  
  // Selected service
  const selectedService = services.find(service => service.selected);

  const toggleService = (id: string) => {
    setServices(services.map(service => ({
      ...service,
      selected: service.id === id ? !service.selected : false
    })));
  };

  // Helper function to get service descriptions
  function getServiceDescription(serviceId: string): string {
    switch(serviceId) {
      case "shopify":
        return "Connect your Shopify store to import users and orders";
      case "wordpress":
        return "Import users and orders from your WordPress site";
      case "salesforce":
        return "Connect to Salesforce to import customer data";
      case "manual":
        return "Upload a CSV file with your users and orders data";
      default:
        return "";
    }
  }

  return (
    <div className="flex-1">
      <h1 className="mb-4 text-4xl font-normal">Import users and orders</h1>
      <p className="text-gray-600 mt-4 text-base mb-[64px]">
        Interrogations will help you power up your CRM by connecting it with multiple 
        sources and it will become like comand center for your business. You can update 
        this option at any point in your settings.
      </p>

      <ScrollArea className="h-[400px] pr-4">
        <div className="flex flex-col gap-4">
          {services.map(service => (
            <ServiceCard 
              key={service.id} 
              title={service.name} 
              selected={service.selected} 
              onClick={() => toggleService(service.id)}
              iconUrl={service.iconUrl}
              description={service.description}
              fullWidth={true}
              formComponent={
                service.selected && (
                  service.id === "shopify" ? <ShopifyForm /> :
                  service.id === "wordpress" ? <WordpressForm /> :
                  service.id === "salesforce" ? <SalesforceForm /> :
                  service.id === "manual" ? <UsersOrdersUploadForm /> : null
                )
              }
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
