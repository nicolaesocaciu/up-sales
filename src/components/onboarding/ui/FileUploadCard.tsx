import { X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
type FileUploadCardProps = {
  fileName: string;
  progress: number;
  timeLeft: number;
  onCancel?: () => void;
  uploadActive: boolean;
};
export const FileUploadCard = ({
  fileName,
  progress,
  timeLeft,
  onCancel,
  uploadActive
}: FileUploadCardProps) => {
  const [currentProgress, setCurrentProgress] = useState(progress);
  const [currentTimeLeft, setCurrentTimeLeft] = useState(timeLeft);
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (uploadActive && currentProgress < 100) {
      timer = setInterval(() => {
        setCurrentProgress(prev => {
          const newProgress = prev + 1;
          if (newProgress >= 100) {
            setCurrentTimeLeft(0);
            return 100;
          }
          setCurrentTimeLeft(Math.max(1 - newProgress / 100, 0));
          return newProgress;
        });
      }, 50);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [uploadActive, currentProgress]);
  return <div className="bg-blue-50 p-6 rounded-[12px]">
      <div className="flex justify-between items-center mb-2">
        <div className="font-medium">{fileName}</div>
        <button className="text-gray-500 hover:text-gray-700" onClick={onCancel}>
          <X size={16} />
        </button>
      </div>
      
      <Progress value={currentProgress} className="h-4 bg-blue-100 rounded-full overflow-hidden" indicatorClassName="bg-[#116FAE] rounded-full" />
      
      <div className="flex justify-between mt-2 text-sm">
        <div>{currentProgress}%</div>
        <div>
          {currentTimeLeft > 0 ? `Estimated time left: ${Math.ceil(currentTimeLeft)} min` : "Upload complete"}
        </div>
      </div>
    </div>;
};