import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
export const BetaPrompt = () => {
  return <div className="px-6">
      <div className="rounded-[16px] p-6 bg-[#116fae] space-y-6">
        <div className="flex items-center text-[#FFFFFF]">
          <Zap className="h-5 w-5" />
          <span className="font-bold text-neutral-50">New features!</span>
        </div>
        <p className="text-sm text-[#f2f2f2] space-y-1">
          Be a pioneer and enroll in our beta program
        </p>
        <Button variant="outline" className="my-0 py-0 mx-0 px-[16px] h-[32px] rounded-lg border-[#FFFFFF] bg-white text-text-dark flex items-center gap-1 w-full">
          Learn more
        </Button>
      </div>
    </div>;
};