
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
import { useOnboardingStorage } from "@/components/onboarding/hooks/useOnboardingStorage";

export const BetaPrompt = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { clearOnboardingData } = useOnboardingStorage();
  
  const handleOpenOnboarding = () => {
    // Reset onboarding data to start fresh
    clearOnboardingData();
    
    // Reset to false first to ensure the component unmounts and remounts
    setShowOnboarding(false);
    
    // Use setTimeout with 0ms delay to push this to the next event loop tick
    // This ensures React has time to process the state change above
    setTimeout(() => {
      setShowOnboarding(true);
    }, 0);
  };

  return <div className="px-8">
      <div className="rounded-[16px] p-6 bg-[#116fae] ">
        <div className="flex items-center text-[#FFFFFF] mb-[8px]">
          <Zap className="h-5 w-5" />
          <span className="font-bold text-neutral-50 mx-[8px]">Onboarding</span>
        </div>
        <p className="text-sm text-[#f2f2f2] mb-[24px]">Get started with our onboarding tour</p>
        <Button 
          variant="outline" 
          className="my-0 py-0 mx-0 px-[16px] h-[32px] w-full border-0" 
          onClick={handleOpenOnboarding}
        >
          Start onboarding
        </Button>
        {showOnboarding && <OnboardingLayout />}
      </div>
    </div>;
};
