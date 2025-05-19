
import { useState } from "react";
import { Button } from "@/components/ui/button";
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

export const IntegrationsStep = ({ onNext, onBack }: IntegrationsStepProps) => {
  const [integrations, setIntegrations] = useState<Integration[]>([
    { id: "hubspot", name: "Hubspot", description: "dsadada", connected: false },
    { id: "trello", name: "Trello", description: "dsadada", connected: false },
    { id: "monday", name: "Monday", description: "dsadada", connected: false },
    { id: "shopify", name: "Shopify", description: "dsadada", connected: false },
    { id: "wordpress", name: "Wordpress", description: "dsadada", connected: false },
    { id: "salesforce", name: "Salesforce", description: "dsadada", connected: false },
  ]);

  const toggleConnection = (id: string) => {
    setIntegrations(integrations.map(item => 
      item.id === id ? { ...item, connected: !item.connected } : item
    ));
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-4">Integrations</h1>
        <p className="text-gray-600 mb-8 max-w-lg">
          Interrogations will help you power up your CRM by connecting it with multiple 
          sources and it will become like comand center for your business. You can update 
          this option at any point in your settings.
        </p>

        <div className="space-y-4">
          {integrations.map(integration => (
            <IntegrationItem 
              key={integration.id}
              name={integration.name}
              description={integration.description}
              connected={integration.connected}
              onToggle={() => toggleConnection(integration.id)}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="px-8"
        >
          ← Back
        </Button>
        <Button 
          onClick={onNext}
          className="px-8"
        >
          Next →
        </Button>
      </div>
    </div>
  );
};
