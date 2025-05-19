
import { Button } from "@/components/ui/button";

type CompletionScreenProps = {
  onTour: () => void;
  onExplore: () => void;
};

export const CompletionScreen = ({ onTour, onExplore }: CompletionScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="mb-8">
        <img 
          src="/completion-illustration.svg" 
          alt="Completion illustration" 
          className="w-32 h-32"
        />
      </div>
      
      <h2 className="text-[#116FAE] font-medium mb-2">Congratulation,</h2>
      <h1 className="text-4xl font-bold mb-4">You are all set up!</h1>
      
      <p className="text-gray-600 max-w-lg mb-10">
        Your CRM has all the needed information to help you grow and push 
        your business forward to the net level
      </p>
      
      <p className="text-gray-600 mb-4">Your next steps:</p>
      
      <div className="flex flex-col items-center gap-4 w-full max-w-xs">
        <Button 
          onClick={onTour}
          className="w-full h-[48px]"
        >
          Start a guided tour
        </Button>
        
        <Button 
          variant="outline"
          onClick={onExplore}
          className="w-full h-[48px]"
        >
          I will explore on my own
        </Button>
      </div>
    </div>
  );
};
