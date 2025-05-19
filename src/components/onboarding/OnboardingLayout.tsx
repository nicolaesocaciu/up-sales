
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { OnboardingSidebar } from "./OnboardingSidebar";
import { OnboardingContent } from "./OnboardingContent";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export type OnboardingStep = {
  id: number;
  title: string;
  completed: boolean;
  active: boolean;
};

export const steps: OnboardingStep[] = [
  { id: 1, title: "Modules configuration", completed: false, active: false },
  { id: 2, title: "Integrations", completed: false, active: false },
  { id: 3, title: "Import products", completed: false, active: false },
  { id: 4, title: "Import users and orders", completed: false, active: false },
  { id: 5, title: "Connect your store", completed: false, active: false },
];

export const OnboardingLayout = () => {
  const [currentStep, setCurrentStep] = useState(0); // 0 = welcome screen
  const [stepsList, setStepsList] = useState<OnboardingStep[]>(steps);
  const [isOpen, setIsOpen] = useState(true);
  const totalSteps = steps.length;

  // Calculate the progress percentage based on completed steps
  const calculateProgress = () => {
    const completedStepsCount = stepsList.filter(step => step.completed).length;
    return Math.round((completedStepsCount / totalSteps) * 100);
  };

  const progress = calculateProgress();

  // Set active step based on currentStep
  useEffect(() => {
    if (currentStep === 0) return; // Welcome screen

    const newStepsList = stepsList.map(step => ({
      ...step,
      active: step.id === currentStep,
      completed: step.id < currentStep
    }));

    setStepsList(newStepsList);
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(totalSteps + 1); // Final screen
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      setCurrentStep(0); // Back to welcome
    }
  };

  const handleSkip = () => {
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-0 max-w-none w-[1440px] h-[984px] rounded-[48px] border-0 overflow-hidden">
        <div className="flex h-full">
          {currentStep > 0 && currentStep <= totalSteps && (
            <OnboardingSidebar 
              steps={stepsList} 
              progress={progress} 
            />
          )}
          
          <div className="flex-1 relative">
            <button 
              onClick={handleClose}
              className="absolute right-8 top-8 z-10 opacity-70 rounded-sm transition-opacity hover:opacity-100"
            >
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.332 21.3335L42.6654 42.6668M42.6654 21.3335L21.332 42.6668" stroke="#252626" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
              </svg>
            </button>
            
            <OnboardingContent 
              currentStep={currentStep}
              onNext={handleNext}
              onBack={handleBack}
              onSkip={handleSkip}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
