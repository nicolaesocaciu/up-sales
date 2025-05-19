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
  connected: boolean;
};
export const IntegrationsStep = ({
  onNext,
  onBack
}: IntegrationsStepProps) => {
  const [integrations, setIntegrations] = useState<Integration[]>([{
    id: "hubspot",
    name: "Hubspot",
    description: "dsadada",
    connected: false
  }, {
    id: "trello",
    name: "Trello",
    description: "dsadada",
    connected: false
  }, {
    id: "monday",
    name: "Monday",
    description: "dsadada",
    connected: false
  }, {
    id: "shopify",
    name: "Shopify",
    description: "dsadada",
    connected: false
  }, {
    id: "wordpress",
    name: "Wordpress",
    description: "dsadada",
    connected: false
  }, {
    id: "salesforce",
    name: "Salesforce",
    description: "dsadada",
    connected: false
  }]);
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

      <div className="space-y-4 ">
        {integrations.map(integration => <IntegrationItem key={integration.id} name={integration.name} description={integration.description} connected={integration.connected} onToggle={() => toggleConnection(integration.id)} />)}
      </div>
    </div>;
};