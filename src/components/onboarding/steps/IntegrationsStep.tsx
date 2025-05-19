
import { useState } from "react";
import { IntegrationItem } from "../ui/IntegrationItem";

type IntegrationsStepProps = {
  onNext: () => void;
  onBack: () => void;
};

type Integration = {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  connected: boolean;
};

export const IntegrationsStep = ({
  onNext,
  onBack
}: IntegrationsStepProps) => {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "hubspot",
      name: "Hubspot",
      description: "Connect your CRM to manage customer relationships and track sales.",
      iconUrl: "https://cdn.worldvectorlogo.com/logos/hubspot-1.svg",
      connected: false
    }, 
    {
      id: "trello",
      name: "Trello",
      description: "Integrate with Trello boards to manage tasks and project workflows.",
      iconUrl: "https://cdn.worldvectorlogo.com/logos/trello.svg",
      connected: false
    }, 
    {
      id: "monday",
      name: "Monday",
      description: "Link your Monday.com boards for project management and collaboration.",
      iconUrl: "/lovable-uploads/6ec4fac8-f096-4716-b534-ea9b39c16b97.png",
      connected: false
    }, 
    {
      id: "shopify",
      name: "Shopify",
      description: "Connect your Shopify store to sync products, orders, and customers.",
      iconUrl: "https://cdn.worldvectorlogo.com/logos/shopify.svg",
      connected: false
    }, 
    {
      id: "wordpress",
      name: "Wordpress",
      description: "Integrate with WordPress to manage content and blog posts.",
      iconUrl: "/lovable-uploads/8e525d23-ac81-4976-8e88-0d30c9131c9b.png",
      connected: false
    }, 
    {
      id: "salesforce",
      name: "Salesforce",
      description: "Connect Salesforce to manage customer data and sales processes.",
      iconUrl: "https://cdn.worldvectorlogo.com/logos/salesforce-2.svg",
      connected: false
    }
  ]);

  const toggleConnection = (id: string) => {
    setIntegrations(integrations.map(item => item.id === id ? {
      ...item,
      connected: !item.connected
    } : item));
  };

  return <div className="flex-1">
      <h1 className="mb-4 font-normal text-4xl">Integrations</h1>
      <p className="text-gray-600 mt-4 text-base mb-[64px]">
        Interrogations will help you power up your CRM by connecting it with multiple 
        sources and it will become like comand center for your business. You can update 
        this option at any point in your settings.
      </p>

      <div className="space-y-4">
        {integrations.map(integration => (
          <IntegrationItem 
            key={integration.id} 
            id={integration.id}
            name={integration.name} 
            description={integration.description}
            iconUrl={integration.iconUrl}
            connected={integration.connected} 
            onToggle={() => toggleConnection(integration.id)} 
          />
        ))}
      </div>
    </div>;
};
