
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ModuleCard } from "../ui/ModuleCard";
type ModulesConfigurationProps = {
  onNext: () => void;
  onBack: () => void;
};
type Module = {
  id: string;
  name: string;
  selected: boolean;
};
export const ModulesConfiguration = ({
  onNext,
  onBack
}: ModulesConfigurationProps) => {
  const [modules, setModules] = useState<Module[]>([{
    id: "discounts",
    name: "Discounts",
    selected: false
  }, {
    id: "finance",
    name: "Finance",
    selected: false
  }, {
    id: "marketing",
    name: "Marketing",
    selected: false
  }, {
    id: "pipelines",
    name: "Pipelines",
    selected: false
  }, {
    id: "rewards",
    name: "Rewards",
    selected: false
  }, {
    id: "stock",
    name: "Stock management",
    selected: false
  }]);
  const toggleModule = (id: string) => {
    setModules(modules.map(module => module.id === id ? {
      ...module,
      selected: !module.selected
    } : module));
  };
  return <div className="flex flex-col h-full">
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-4">Modules configuration</h1>
        <p className="text-gray-600 mt-4">
          Choose the modules you need to be the most eficient. Choosing only the modules 
          you need it will help us to adapt your interface to your needs without distraction. 
          You can update this option at any point in your settings.
        </p>

        <div className="grid grid-cols-3 gap-8 mt-[64px]">
          {modules.map(module => <ModuleCard key={module.id} title={module.name} selected={module.selected} icon={module.id} onClick={() => toggleModule(module.id)} />)}
        </div>
      </div>

      <div className="fixed bottom-0 left-[300px] right-0 bg-white py-[24px] px-[128px] border-t border-[#C0C0C0] flex justify-between">
        <Button variant="outline" onClick={onBack} className="w-[200px] h-[42px] text-base">
          ← Back
        </Button>
        <Button onClick={onNext} className="px-8 w-[200px] h-[42px]">
          Next →
        </Button>
      </div>
    </div>;
};
