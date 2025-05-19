
import { X } from "lucide-react";
import { Progress } from "@/components/ui/progress";

type FileUploadCardProps = {
  fileName: string;
  progress: number;
  timeLeft: number;
};

export const FileUploadCard = ({ fileName, progress, timeLeft }: FileUploadCardProps) => {
  return (
    <div className="bg-blue-50 p-6 rounded-lg max-w-lg">
      <div className="flex justify-between items-center mb-2">
        <div className="font-medium">{fileName}</div>
        <button className="text-gray-500 hover:text-gray-700">
          <X size={16} />
        </button>
      </div>
      
      <div className="relative h-4 w-full bg-blue-100 rounded-full overflow-hidden">
        <div 
          className="absolute h-full bg-blue-500 left-0 top-0 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between mt-2 text-sm">
        <div>{progress}%</div>
        <div>Estimated time left: {timeLeft} min</div>
      </div>
    </div>
  );
};
