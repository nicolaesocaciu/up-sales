
import { WelcomeScreen } from "./steps/WelcomeScreen";
import { ModulesConfiguration } from "./steps/ModulesConfiguration";
import { IntegrationsStep } from "./steps/IntegrationsStep";
import { ImportProducts } from "./steps/ImportProducts";
import { ImportUsersOrders } from "./steps/ImportUsersOrders";
import { ConnectStore } from "./steps/ConnectStore";
import { CompletionScreen } from "./steps/CompletionScreen";
import { Button } from "@/components/ui/button";

type OnboardingContentProps = {
  currentStep: number;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
};

export const OnboardingContent = ({
  currentStep,
  onNext,
  onBack,
  onSkip
}: OnboardingContentProps) => {
  // Render the appropriate step content based on currentStep
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeScreen onStart={onNext} onSkip={onSkip} />;
      case 1:
        return <ModulesConfiguration onNext={onNext} onBack={onBack} />;
      case 2:
        return <IntegrationsStep onNext={onNext} onBack={onBack} />;
      case 3:
        return <ImportProducts onNext={onNext} onBack={onBack} />;
      case 4:
        return <ImportUsersOrders onNext={onNext} onBack={onBack} />;
      case 5:
        return <ConnectStore onNext={onNext} onBack={onBack} />;
      case 6:
        return <CompletionScreen onTour={onSkip} onExplore={onSkip} />;
      default:
        return <WelcomeScreen onStart={onNext} onSkip={onSkip} />;
    }
  };

  // Show footer for steps 1-5 (skip welcome screen and completion screen)
  const shouldShowFooter = currentStep > 0 && currentStep < 6;
  
  return (
    <div className="h-full p-12 flex flex-col px-[128px] py-[96px] relative">
      {renderStepContent()}
      
      {shouldShowFooter && (
        <div className="fixed bottom-0 right-0 bg-white py-[24px] px-[128px] border-t border-[#C0C0C0] flex justify-between w-[1080px]">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="w-[200px] h-[42px] text-base"
          >
            ← Back
          </Button>
          <Button 
            onClick={onNext}
            className="px-8 w-[200px] h-[42px]"
          >
            Next →
          </Button>
        </div>
      )}
    </div>
  );
};
