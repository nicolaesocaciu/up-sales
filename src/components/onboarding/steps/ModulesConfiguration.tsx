
import { useState, useEffect } from "react";
import { ModuleCard } from "../ui/ModuleCard";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { ONBOARDING_STORAGE_KEYS } from "../hooks/useOnboardingStorage";

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
  const initialModules = [
    {
      id: "discounts",
      name: "Discounts",
      selected: false
    }, 
    {
      id: "finance",
      name: "Finance",
      selected: false
    }, 
    {
      id: "marketing",
      name: "Marketing",
      selected: false
    }, 
    {
      id: "pipelines",
      name: "Pipelines",
      selected: false
    }, 
    {
      id: "rewards",
      name: "Rewards",
      selected: false
    }, 
    {
      id: "stock",
      name: "Stock management",
      selected: false
    }
  ];
  
  const [modules, setModules] = useLocalStorageState<Module[]>(
    ONBOARDING_STORAGE_KEYS.MODULES,
    initialModules
  );

  const toggleModule = (id: string) => {
    setModules(modules.map(module => module.id === id ? {
      ...module,
      selected: !module.selected
    } : module));
  };

  return <div className="flex-1">
      <h1 className="mb-4 font-normal text-4xl">Modules configuration</h1>
      <p className="text-gray-600 mt-4 text-base mb-[64px]">
        Choose the modules you need to be the most eficient. Choosing only the modules 
        you need it will help us to adapt your interface to your needs without distraction. 
        You can update this option at any point in your settings.
      </p>

      <div className="grid grid-cols-3 gap-8">
        {modules.map(module => <ModuleCard 
          key={module.id} 
          title={module.name} 
          selected={module.selected} 
          icon={module.id} 
          onClick={() => toggleModule(module.id)} 
        />)}
      </div>
    </div>;
};
