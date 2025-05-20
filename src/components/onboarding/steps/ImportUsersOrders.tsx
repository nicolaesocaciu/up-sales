
import { useState } from "react";
import { ServiceCard } from "../ui/ServiceCard";
import { ImportServicesProps, importUsersOrdersServices, Service } from "../types/serviceTypes";
import { UsersOrdersUploadForm } from "../forms/UsersOrdersUploadForm";
import { ShopifyOrdersForm } from "../forms/ShopifyOrdersForm";
import { WordpressOrdersForm } from "../forms/WordpressOrdersForm";
import { SalesforceOrdersForm } from "../forms/SalesforceOrdersForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { ONBOARDING_STORAGE_KEYS } from "../hooks/useOnboardingStorage";

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
  // Initialize with localStorage state
  const [services, setServices] = useLocalStorageState<Service[]>(
    ONBOARDING_STORAGE_KEYS.USERS_ORDERS,
    importUsersOrdersServices.map(service => ({
      ...service,
      selected: false
    }))
  );

  // Selected service
  const selectedService = services.find(service => service.selected);
  
  const toggleService = (id: string) => {
    setServices(services.map(service => ({
      ...service,
      selected: service.id === id
    })));
  };
  
  return <div className="flex-1">
      <h1 className="mb-4 text-4xl font-normal">Import users and orders</h1>
      <p className="text-gray-600 mt-4 text-base mb-8">Import your existing users and orders to get started quickly with your CRM. Connect to your preferred platform or upload data manually to centralize everything in one place.</p>

      <ScrollArea style={{
      scrollbarWidth: 'auto'
    }} className="h-[630px] pr-4 overflow-y-auto">
        <div className="flex flex-col w-full h-full">
          {services.map(service => <ServiceCard 
              key={service.id} 
              title={service.name} 
              description={serviceDescriptions[service.id as keyof typeof serviceDescriptions]} 
              selected={service.selected} 
              onClick={() => toggleService(service.id)} 
              iconUrl={service.iconUrl} 
              isExpandable={true}
            >
              {service.id === "shopify" && <ShopifyOrdersForm />}
              {service.id === "wordpress" && <WordpressOrdersForm />}
              {service.id === "salesforce" && <SalesforceOrdersForm />}
              {service.id === "manual" && <UsersOrdersUploadForm />}
            </ServiceCard>)}
        </div>
      </ScrollArea>
    </div>;
};
