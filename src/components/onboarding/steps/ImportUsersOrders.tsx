
import { useState } from "react";
import { ServiceCard } from "../ui/ServiceCard";
import { FileUploadCard } from "../ui/FileUploadCard";

type ImportUsersOrdersProps = {
  onNext: () => void;
  onBack: () => void;
};

type Service = {
  id: string;
  name: string;
  selected: boolean;
};

export const ImportUsersOrders = ({ onNext, onBack }: ImportUsersOrdersProps) => {
  const [services, setServices] = useState<Service[]>([
    { id: "shopify", name: "Shopify", selected: false },
    { id: "wordpress", name: "Wordpress", selected: false },
    { id: "salesforce", name: "Salesforce", selected: false },
    { id: "manual", name: "Manual", selected: true },
  ]);

  const [fileUploaded, setFileUploaded] = useState(true);

  const toggleService = (id: string) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, selected: !service.selected } : service
    ));
  };

  return (
    <div className="flex-1">
      <h1 className="text-3xl font-bold mb-4">Import users and orders</h1>
      <p className="text-gray-600 mb-8 max-w-lg">
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
          />
        ))}
      </div>

      {fileUploaded && (
        <FileUploadCard 
          fileName="File name.csv"
          progress={11}
          timeLeft={1}
        />
      )}
    </div>
  );
};
