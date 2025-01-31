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
          className="w-full bg-white hover:bg-gray-50"
        >
          Learn more
        </Button>
      </div>
    </div>
  );
};