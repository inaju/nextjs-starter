import axios from "axios";
import { Button } from "../ui/button";
import { generateQR } from "@/pages/api/utils/create-qr-code";

const UploadAndDisplayImage = ({ field, selectedImage, setSelectedImage }) => {
 
  return (
    <div className="space-y-3">
      {!selectedImage && (
        <div className="w-full h-[200px] border rounded-lg flex items-center justify-center gap-2">
          No Image Selected
        </div>
      )}
      {selectedImage && (
        <div>
          <img
            className="w-full"
            alt="not found"
            src={URL.createObjectURL(selectedImage)}
          />
        </div>
      )}
      <div className="flex gap-2">
        {selectedImage &&
          <Button onClick={() => setSelectedImage(null)} className="bg-white text-slate-500 hover:bg-slate-200">Remove</Button>
        }
        {/* {!selectedImage &&
          <input
            className="hover:cursor-pointer 
          flex file:items-center file:flex file:justify-center justify-center w-full rounded-md border border-input 
          bg-background px-[35%] py-[35%] text-sm shadow-sm 
          transition-colors 
          file:border-0 file:bg-transparent file:text-foreground 
          file:text-sm file:font-medium placeholder:text-muted-foreground 
          focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
          disabled:cursor-not-allowed disabled:opacity-50"
            type="file"
            name={field?.name}
            accept="image/png, image/gif, image/jpeg"
            onChange={(event) => {
              setSelectedImage(event.target.files[0]);
              field.onChange(event.target.files[0])
            }}
          >
          </input>
        } */}
        <input
          className="hover:cursor-pointer 
          flex  w-full rounded-md border border-input 
          bg-background px-4 py-2 text-sm shadow-sm 
          transition-colors 
          file:border-0 file:bg-transparent file:text-foreground 
          file:text-sm file:font-medium placeholder:text-muted-foreground 
          focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
          disabled:cursor-not-allowed disabled:opacity-50"
          type="file"
          name={field?.name}
          accept="image/png, image/gif, image/jpeg"
          onChange={(event) => {
            // handleOnChange(event.target.files[0])
            setSelectedImage(event.target.files[0]);
            // field.onChange(event.target.files[0]);
          }}
        >
        </input>
      </div>
    </div>
  );
};
export default UploadAndDisplayImage;