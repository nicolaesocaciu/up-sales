
import { useState } from "react";
import { ServiceCard } from "../ui/ServiceCard";
import { ImportServicesProps, importUsersOrdersServices, Service } from "../types/serviceTypes";
import { UsersOrdersUploadForm } from "../forms/UsersOrdersUploadForm";
import { ShopifyForm } from "../forms/ShopifyForm";
import { WordpressForm } from "../forms/WordpressForm";
import { SalesforceForm } from "../forms/SalesforceForm";

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
      selected: service.id === id ? !service.selected : false
    })));
  };

  return (
    <div className="flex-1">
      <h1 className="mb-4 text-4xl font-normal">Import users and orders</h1>
      <p className="text-gray-600 mt-4 text-base mb-[64px]">
        Interrogations will help you power up your CRM by connecting it with multiple 
        sources and it will become like comand center for your business. You can update 
        this option at any point in your settings.
      </p>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {services.map(service => (
          <ServiceCard 
            key={service.id} 
            title={service.name} 
            selected={service.selected} 
            onClick={() => toggleService(service.id)}
            iconUrl={service.iconUrl} 
          />
        ))}
      </div>

      {selectedService && selectedService.id === "shopify" && <ShopifyForm />}
      {selectedService && selectedService.id === "wordpress" && <WordpressForm />}
      {selectedService && selectedService.id === "salesforce" && <SalesforceForm />}
      {selectedService && selectedService.id === "manual" && <UsersOrdersUploadForm />}
    </div>
  );
};
