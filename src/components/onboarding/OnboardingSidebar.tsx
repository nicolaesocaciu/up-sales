
import { Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { OnboardingStep } from "./OnboardingLayout";

type OnboardingSidebarProps = {
  steps: OnboardingStep[];
  progress: number;
};

export const OnboardingSidebar = ({ steps, progress }: OnboardingSidebarProps) => {
  return (
    <div className="bg-[#116FAE] w-[220px] text-white p-8 relative flex flex-col">
      <div className="flex items-center gap-2 mb-10">
        <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
          <span className="text-[#116FAE] text-sm font-bold">V</span>
        </div>
        <span className="font-semibold">Up Sales</span>
      </div>
      
      <div className="flex-1">
        {steps.map((step) => (
          <div key={step.id} className="mb-10 relative">
            <div className="flex items-center mb-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-4 
                ${step.completed ? 'bg-white text-[#116FAE]' : step.active ? 'bg-white text-[#116FAE]' : 'border border-white bg-transparent'}`}>
                {step.completed ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <span className="text-sm">{step.id}</span>
                )}
              </div>
              <span className={`text-sm ${step.active ? 'font-medium' : ''}`}>{step.title}</span>
            </div>
            
            {step.id < steps.length && (
              <div className="w-[1px] h-6 bg-white/30 ml-3"></div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-auto">
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
            <div className="w-5 h-5 rounded-full border-3 border-[#116FAE] border-t-transparent animate-spin"></div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium">{progress}% finished</div>
            <div className="text-xs opacity-80">Estimated time: 5 minutes</div>
          </div>
        </div>
        <Progress value={progress} className="h-1 bg-white/20" />
      </div>
    </div>
  );
};
