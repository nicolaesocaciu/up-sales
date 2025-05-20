
import { useState, useEffect } from "react";
import { FileUploadCard } from "../ui/FileUploadCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

export const ManualUploadForm = () => {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileName, setFileName] = useState("File name.csv");
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1);
  const [uploadActive, setUploadActive] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);
  
  const handleFileUpload = () => {
    setFileUploaded(true);
    setProgress(0);
    setTimeLeft(1);
    setUploadActive(true);
  };
  
  const handleCancelUpload = () => {
    setFileUploaded(false);
    setUploadActive(false);
    setProgress(0);
  };
  
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (uploadActive && progress < 100) {
      timer = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 1;
          if (newProgress >= 100) {
            setTimeLeft(0);
            setImportSuccess(true);
            setUploadActive(false);
            return 100;
          }
          setTimeLeft(Math.max(1 - newProgress / 100, 0));
          return newProgress;
        });
      }, 50);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [uploadActive, progress]);
  
  return <div className="mt-8">
      {fileUploaded ? (
        <>
          {progress < 100 ? (
            <FileUploadCard 
              fileName={fileName} 
              progress={progress} 
              timeLeft={timeLeft} 
              onCancel={handleCancelUpload} 
              uploadActive={uploadActive} 
            />
          ) : (
            <div className="flex items-center gap-4">
              <Button disabled>
                Successfully imported
              </Button>
              <Badge variant="green" className="flex items-center gap-2 py-[3px] px-[12px]">
                <Check size={16} className="text-[#2D7048]" />
                <span>3872 products have been successfully imported</span>
              </Badge>
            </div>
          )}
        </>
      ) : (
        <div className="bg-[#F2F2F2] p-6 rounded-[16px]">
          <div onClick={handleFileUpload} className="text-center p-[72px] border-2 border-dashed border-[#6CB2E1] rounded-[8px] cursor-pointer">
            <div className="mb-4">
             <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none" className="mx-auto">
              <path d="M38.6028 6.33301C38.6867 6.33305 38.768 6.34473 38.8459 6.36426H39.2961L39.3977 6.36914C39.6324 6.39304 39.8528 6.50016 40.0178 6.67188L53.5276 20.7412C53.7061 20.9273 53.8058 21.1757 53.8059 21.4336V45.9346L53.7951 46.5049C53.5459 52.1723 49.1173 56.7883 43.4641 57.2705L42.8947 57.3047C42.883 57.3051 42.8704 57.3057 42.8586 57.3057H21.2434C15.0959 57.1739 10.2141 52.0884 10.3342 45.9404H10.3332V17.3086L10.3342 17.2842L10.3615 16.7168C10.7933 10.8962 15.659 6.34459 21.5578 6.36523V6.36426H38.3586C38.4367 6.34469 38.5186 6.33301 38.6028 6.33301ZM21.0871 8.37402C16.2994 8.59535 12.4501 12.4864 12.3332 17.332V45.9619C12.2251 51.0147 16.235 55.1972 21.2854 55.3057H42.8401C47.865 55.119 51.8345 50.9762 51.8059 45.9463V22.957H45.4504C41.1134 22.9447 37.603 19.429 37.6028 15.0908V8.36426H21.5539L21.0871 8.37402ZM31.0403 25.4229C31.1707 25.4229 31.2952 25.4486 31.4094 25.4941C31.5366 25.5441 31.6539 25.6202 31.7522 25.7188L38.0051 31.999L38.0744 32.0752C38.3934 32.4686 38.3688 33.0479 38.0022 33.4131C37.6355 33.7782 37.0564 33.8001 36.6643 33.4795L36.5881 33.4102L32.0403 28.8428V42.5322C32.0402 43.0843 31.5923 43.532 31.0403 43.5322C30.488 43.5322 30.0403 43.0845 30.0403 42.5322V28.8486L25.4992 33.4102L25.4231 33.4795C25.0311 33.8004 24.4511 33.778 24.0842 33.4131C23.6933 33.0234 23.6918 32.3903 24.0813 31.999L30.2737 25.7793C30.4571 25.5613 30.733 25.4229 31.0403 25.4229Z" fill="#1482CC"/>
            </svg>
            </div>
            <p className="text-[#252626] font-medium">Click to upload a CSV file</p>
            <p className="text-[#252626] text-sm mt-1">or drag and drop</p>
          </div>
        </div>
      )}
    </div>;
};
