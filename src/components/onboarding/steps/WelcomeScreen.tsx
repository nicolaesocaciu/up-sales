
import { Button } from "@/components/ui/button";

type WelcomeScreenProps = {
  onStart: () => void;
  onSkip: () => void;
};

export const WelcomeScreen = ({ onStart, onSkip }: WelcomeScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="mb-8">
        <img 
          src="/welcome-illustration.svg" 
          alt="Welcome illustration"
          className="w-32 h-32" 
        />
      </div>
      
      <h1 className="text-4xl font-bold mb-4">
        Welcome to <span className="text-[#116FAE]">Up Sales</span>
      </h1>
      
      <p className="text-gray-600 max-w-lg mb-10">
        Your all-in-one solution for managing customers, tracking orders, and growing your business.
        Let's set up your account to get started.
      </p>
      
      <div className="flex flex-col items-center gap-4">
        <Button 
          onClick={onStart}
          className="w-64 h-[48px]"
        >
          Get started
        </Button>
        
        <button 
          onClick={onSkip}
          className="text-[#116fae] hover:underline text-sm"
        >
          Skip onboarding
        </button>
      </div>
    </div>
  );
};
