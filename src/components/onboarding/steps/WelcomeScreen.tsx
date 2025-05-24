import { Button } from "@/components/ui/button";
type WelcomeScreenProps = {
  onStart: () => void;
  onSkip: () => void;
};
export const WelcomeScreen = ({
  onStart,
  onSkip
}: WelcomeScreenProps) => {
  return <div className="flex flex-col items-center h-full text-center ">
      <div className="mb-8">
        
      </div>
      
      <h1 className="mb-4  font-normal ">
        Welcome to this awsome import<span className="text-[#FFF] font-extrabold">Up Sales</span>
      </h1>
      
      <p className="mb-10 text-2xl text-[#494a4a] font-light max-w-[980px] text-[64px]">Your all-in-one solution for managing customers, tracking orders, and growing your business. Let's set up your application to get started.</p>
      
      <div className="flex flex-col items-center gap-8 mt-auto">
        <Button onClick={onStart} className="w-[360px] h-[60px] text-[16px] font-light">
          Get started
        </Button>
        
        <button onClick={onSkip} className="text-[#116fae] hover:underline text-base">
          Skip onboarding
        </button>
      </div>
    </div>;
};