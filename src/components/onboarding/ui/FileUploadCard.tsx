
import { X, Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

type FileUploadCardProps = {
  fileName: string;
  progress: number;
  timeLeft: number;
  onCancel?: () => void;
  uploadActive: boolean;
  importSuccess?: boolean;
};

export const FileUploadCard = ({
  fileName,
  progress,
  timeLeft,
  onCancel,
  uploadActive,
  importSuccess = false
}: FileUploadCardProps) => {
  const [currentProgress, setCurrentProgress] = useState(progress);
  const [currentTimeLeft, setCurrentTimeLeft] = useState(timeLeft);
  
  useEffect(() => {
    setCurrentProgress(progress);
    setCurrentTimeLeft(timeLeft);
  }, [progress, timeLeft]);
  
  return <div className="bg-[#F2F2F2] p-6 rounded-[12px]">
      <div className="flex justify-between items-center mb-2">
        <div className="font-medium">{fileName}</div>
        <button className="text-gray-500 hover:text-gray-700" onClick={onCancel}>
          <X size={16} />
        </button>
      </div>
      
      <Progress value={currentProgress} className="h-4 bg-[#D2EAFA] rounded-full overflow-hidden" indicatorClassName="bg-[#1482CC] rounded-full shadow-[0px_2px_4px_0px_rgba(17, 111, 174, 0.20)]" />
      
      <div className="flex justify-between mt-2 text-sm">
        <div>{currentProgress}%</div>
          <div>
            {currentTimeLeft > 0 ? `Estimated time left: ${Math.ceil(currentTimeLeft)} min` : "Upload complete"}
          </div>
      </div>

      <div>
        {importSuccess && (
          <Badge variant="green" className="flex items-center gap-2 px-[12px] py-[7px] w-full mt-4">
            <Check size={16} className="text-[#2D7048]" />
            <span className="text-sm">3872 products have been successfully imported</span>
          </Badge>
        )}
      </div>
    </div>;
};
