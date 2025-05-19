
import { useState } from "react";
import { ServiceCard } from "../ui/ServiceCard";
import { ImportServicesProps, importProductServices, Service } from "../types/serviceTypes";
import { ManualUploadForm } from "../forms/ManualUploadForm";
import { ShopifyForm } from "../forms/ShopifyForm";
import { WordpressForm } from "../forms/WordpressForm";
import { SalesforceForm } from "../forms/SalesforceForm";

export const ImportProducts = ({
  onNext,
  onBack
}: ImportServicesProps) => {
  const [services, setServices] = useState<Service[]>(importProductServices);
  
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
      <h1 className="mb-4 text-4xl font-normal">Import products</h1>
      <p className="text-gray-600 mt-4 text-base mb-[64px]">
        Choose your preferred platform to import products. Connect to your existing store
        or upload a CSV file to set up your product catalog efficiently and accurately.
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
      {selectedService && selectedService.id === "manual" && <ManualUploadForm />}
    </div>
  );
};
