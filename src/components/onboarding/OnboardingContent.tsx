
import { WelcomeScreen } from "./steps/WelcomeScreen";
import { ModulesConfiguration } from "./steps/ModulesConfiguration";
import { IntegrationsStep } from "./steps/IntegrationsStep";
import { ImportProducts } from "./steps/ImportProducts";
import { ImportUsersOrders } from "./steps/ImportUsersOrders";
import { ConnectStore } from "./steps/ConnectStore";
import { CompletionScreen } from "./steps/CompletionScreen";

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

  return (
    <div className="h-full p-12 flex flex-col">
      {renderStepContent()}
    </div>
  );
};
