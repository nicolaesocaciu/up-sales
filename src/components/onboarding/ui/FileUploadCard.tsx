
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
      
      <Progress 
        value={progress} 
        className="h-4 bg-blue-100 rounded-full overflow-hidden"
        indicatorClassName="bg-blue-500 rounded-full"
      />
      
      <div className="flex justify-between mt-2 text-sm">
        <div>{progress}%</div>
        <div>
          {timeLeft > 0
            ? `Estimated time left: ${Math.ceil(timeLeft)} min`
            : "Upload complete"
          }
        </div>
      </div>
    </div>
  );
};
