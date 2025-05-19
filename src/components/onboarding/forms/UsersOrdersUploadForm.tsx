
import { useState, useEffect } from "react";
import { FileUploadCard } from "../ui/FileUploadCard";

export const UsersOrdersUploadForm = () => {
  const [fileUploaded, setFileUploaded] = useState(true);
  
  return (
    <div className="mt-8">
      {fileUploaded && <FileUploadCard fileName="File name.csv" progress={11} timeLeft={1} uploadActive={true} />}
    </div>
  );
};
