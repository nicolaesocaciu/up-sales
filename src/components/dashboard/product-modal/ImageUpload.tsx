
import { useRef } from "react";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";

interface ImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
}

export const ImageUpload = ({ images, onImagesChange }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddImage = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImageUrls = Array.from(files).map(file => URL.createObjectURL(file));
      onImagesChange([...images, ...newImageUrls]);
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    onImagesChange(images.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div>
      <Label>Images</Label>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
      <div className="mt-2 grid grid-cols-2 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img 
              src={image} 
              alt={`Product ${index + 1}`} 
              className="w-full h-48 object-cover rounded-lg border" 
            />
            <button
              onClick={() => handleRemoveImage(index)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
        <button 
          onClick={handleAddImage} 
          className="border-2 border-dashed rounded-lg flex items-center justify-center h-48 hover:border-gray-400 transition-colors"
        >
          <div className="text-center">
            <Plus className="h-6 w-6 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-500">Add images</p>
            <p className="text-xs text-gray-400">or drop files to upload</p>
          </div>
        </button>
      </div>
    </div>
  );
};
