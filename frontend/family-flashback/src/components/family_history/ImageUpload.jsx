import React, {useState} from "react";
import DefaultImage from "../assets/upload-family-photo-gray-bg.png";
import UploadIcon from "../assets/upload-solid.svg";

const ImageUpload = () => {
    const [imageURL, setImageURL] = useState(DefaultImage);

    return (
        <div className="relative h-1200 w-630">
            <img 
                src={imageURL}
                alt="FamilyImage"
                className="relative h-1200 w-630" />
            
            <form id="form" encType="multipart/form-data">
            <button
                type='submit'
                //adjust sizing after fixing css sizing & padding for title and image
                className="flex-center absolute bottom-12 right-10 h-9 w-9 rounded-full">
            
                <img
                    src={UploadIcon}
                    alt="Upload"
                    className="object-cover" />

            </button>
                <input
                    type="file"
                    id="file" 
                    hidden />
                    
            </form>

        </div>
    )


}

export default ImageUpload;