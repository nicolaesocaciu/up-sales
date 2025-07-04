
import { Button } from "@/components/ui/button";
import { useConfetti } from "@/hooks/useConfetti";

type CompletionScreenProps = {
  onTour: () => void;
  onExplore: () => void;
};

export const CompletionScreen = ({
  onTour,
  onExplore
}: CompletionScreenProps) => {
  const { triggerConfetti } = useConfetti();

  const handleTourClick = () => {
    triggerConfetti();
    onTour();
  };

  const handleExploreClick = () => {
    triggerConfetti();
    onExplore();
  };

  return <div className="flex flex-col items-center h-full text-center">
      <div className="mb-8">
        <img src="/lovable-uploads/9da62b64-b9dd-42d5-965c-171f28c54fef.png" alt="Completion illustration" className="w-256 h-256" />
      </div>
      
      <h2 className="text-[#116FAE] mb-[-10px] font-medium">Congratulation,</h2>
      <h1 className="mb-4 text-[64px] font-normal">You are all set up!</h1>
      
      <p className="mb-10 text-2xl text-[#494a4a] font-light max-w-[700px]">Your CRM has all the needed information to help you grow and push your business forward to the next level.</p>
      
      
      <div className="flex flex-col items-center gap-8 mt-auto">
        <p className="text-[#494a4a]">Your next steps:</p>
        <div className="flex flex-row items-center gap-8">
          <Button onClick={handleTourClick} className="w-[360px] h-[60px] text-[16px] font-light">
            Start a guided tour
          </Button>
          
          <Button variant="outline" onClick={handleExploreClick} className="w-[360px] h-[60px] text-[16px] font-light">
            I will explore on my own
          </Button>
        </div>
      </div>
    </div>;
};
