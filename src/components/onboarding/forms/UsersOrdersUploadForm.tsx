
import { useState, useEffect } from "react";
import { FileUploadCard } from "../ui/FileUploadCard";
import { Badge } from "@/components/ui/badge";

export const UsersOrdersUploadForm = () => {
  const [fileUploaded, setFileUploaded] = useState(true);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [progress, setProgress] = useState(11);
  const [timeLeft, setTimeLeft] = useState(1);
  
  // Simulate file upload progress
  useEffect(() => {
    if (fileUploaded && progress < 100) {
      const timer = setTimeout(() => {
        if (progress < 100) {
          setProgress(prev => {
            const newProgress = prev + 10;
            if (newProgress >= 100) {
              setTimeLeft(0);
              setUploadComplete(true);
              return 100;
            }
            setTimeLeft(prev => Math.max(0, prev - 0.1));
            return newProgress;
          });
        }
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [fileUploaded, progress]);
  
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Upload Users & Orders</h3>
        {uploadComplete && (
          <Badge variant="green" className="text-xs px-[12px] py-[3px]">
            3872 users and orders have been successfully imported
          </Badge>
        )}
      </div>
      
      {fileUploaded && !uploadComplete && (
        <FileUploadCard 
          fileName="File name.csv" 
          progress={progress} 
          timeLeft={timeLeft} 
          uploadActive={true} 
        />
      )}
    </div>
  );
};
