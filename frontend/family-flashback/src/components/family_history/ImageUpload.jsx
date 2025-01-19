import React, {useState, useRef} from "react";
import DefaultImage from "../assets/upload-family-photo-gray-bg.png";
import UploadIcon from "../assets/upload-solid.svg";

const ImageUpload = () => {
    const [imageURL, setImageURL] = useState(DefaultImage);

    const fileUploadRef = useRef();

    const handleImageUpload = (event) => {
        event.preventDefault();
        fileUploadRef.current.click();
    }

    const uploadImageDisplay = () => {
        const uploadedFile = fileUploadRef.current.files[0];

        const cachedURL = URL.createObjectURL(uploadedFile);

        setImageURL(cachedURL);
    }

    return (
        <div className="relative h-1200 w-630">
            <img 
                src={imageURL}
                alt="FamilyImage"
                className="relative h-1200 w-630" />
            
            <form id="form" encType="multipart/form-data">
            <button
                type='submit'
                onClick={handleImageUpload}
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
                    ref={fileUploadRef}
                    onChange={uploadImageDisplay}
                    hidden />
                    
            </form>

        </div>
    )


}

export default ImageUpload;