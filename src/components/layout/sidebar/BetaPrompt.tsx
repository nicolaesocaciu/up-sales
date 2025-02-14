
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export const BetaPrompt = () => {
  return (
    <div className="px-4">
      <div className="bg-blue-50 rounded-lg p-4 space-y-3">
        <div className="flex items-center space-x-2 text-gray-800">
          <Zap className="h-5 w-5" />
          <span className="font-semibold">New features!</span>
        </div>
        <p className="text-sm text-gray-600">
          Be a pioneer and enroll in our beta program
        </p>
        <Button
          variant="outline"
          className="my-0 py-0 mx-0 px-[16px] h-[32px] rounded-lg border-[#8A8A8A] bg-white text-text-dark flex items-center gap-1 w-full"
        >
          Learn more
        </Button>
      </div>
    </div>
  );
};
