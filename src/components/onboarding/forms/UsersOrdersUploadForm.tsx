
import { useState, useEffect } from "react";
import { FileUploadCard } from "../ui/FileUploadCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export const UsersOrdersUploadForm = () => {
  const [fileUploaded, setFileUploaded] = useState(true);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [progress, setProgress] = useState(11);
  const [timeLeft, setTimeLeft] = useState(1);
  const [isImporting, setIsImporting] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);
  
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
  
  const handleImport = () => {
    if (isImporting || importSuccess) return;
    setIsImporting(true);
    
    // Simulate import process
    setTimeout(() => {
      setIsImporting(false);
      setImportSuccess(true);
    }, 2000);
  };
  
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Upload Users & Orders</h3>
        {importSuccess && (
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
      
      {uploadComplete && !importSuccess && (
        <div className="mt-4">
          <Button 
            onClick={handleImport}
            disabled={isImporting || importSuccess}
          >
            {isImporting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isImporting ? "Importing..." : importSuccess ? "Successfully imported" : "Import Data"}
          </Button>
        </div>
      )}
      
      {uploadComplete && importSuccess && (
        <div className="mt-4">
          <Button disabled={true}>Successfully imported</Button>
        </div>
      )}
    </div>
  );
};
