
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const BetaPrompt = () => {
  return <div className="px-8">
      <div className="rounded-[16px] p-6 bg-[#116fae] ">
        <div className="flex items-center text-[#FFFFFF] mb-[8px]">
          <Zap className="h-5 w-5" />
          <span className="font-bold text-neutral-50 mx-[8px]">New features!</span>
        </div>
        <p className="text-sm text-[#f2f2f2] mb-[24px]">
          Be a pioneer and enroll in our beta program
        </p>
        <Link to="/onboarding">
          <Button variant="outline" className="my-0 py-0 mx-0 px-[16px] h-[32px] w-full border-0">
            Learn more
          </Button>
        </Link>
      </div>
    </div>;
};
