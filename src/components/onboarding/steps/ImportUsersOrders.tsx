
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
  
  const toggleService = (id: string) => {
    setServices(services.map(service => ({
      ...service,
      selected: service.id === id ? !service.selected : false
    })));
  };

  // Function to get the appropriate form component based on service ID
  const getFormComponent = (serviceId: string) => {
    switch(serviceId) {
      case "shopify":
        return <ShopifyForm />;
      case "wordpress":
        return <WordpressForm />;
      case "salesforce":
        return <SalesforceForm />;
      case "manual":
        return <UsersOrdersUploadForm />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1">
      <h1 className="mb-4 text-4xl font-normal">Import users and orders</h1>
      <p className="text-gray-600 mt-4 text-base mb-[64px]">
        Interrogations will help you power up your CRM by connecting it with multiple 
        sources and it will become like comand center for your business. You can update 
        this option at any point in your settings.
      </p>

      <div className="grid grid-cols-1 gap-6 mb-8">
        {services.map(service => (
          <ServiceCard 
            key={service.id} 
            title={service.name} 
            selected={service.selected} 
            onClick={() => toggleService(service.id)}
            iconUrl={service.iconUrl}
            formComponent={getFormComponent(service.id)}
          />
        ))}
      </div>
    </div>
  );
};
