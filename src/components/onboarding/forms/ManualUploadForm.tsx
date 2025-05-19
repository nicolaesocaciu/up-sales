import { useState } from "react";
import { FileUploadCard } from "../ui/FileUploadCard";
export const ManualUploadForm = () => {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileName, setFileName] = useState("File name.csv");
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1);
  const [uploadActive, setUploadActive] = useState(false);
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
  return <div className="mt-8">
      {fileUploaded ? <FileUploadCard fileName={fileName} progress={progress} timeLeft={timeLeft} onCancel={handleCancelUpload} uploadActive={uploadActive} /> : <div className="bg-[#f2f2f2] p-6 rounded-lg ">
          <div className="text-center p-8 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer" onClick={handleFileUpload}>
            <div className="mb-4">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto text-[#116FAE]">
                <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M17 8L12 3L7 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-[#116FAE] font-medium">Click to upload a CSV file</p>
            <p className="text-[#116FAE] text-sm mt-1">or drag and drop</p>
          </div>
        </div>}
    </div>;
};