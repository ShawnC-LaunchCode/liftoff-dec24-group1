import React, {useState} from "react";
import DefaultImage from "../assets/upload-family-photo-gray-bg.png";

const ImageUpload = () => {
    const [imageURL, setImageURL] = useState(DefaultImage);

    return (
        <div className="relative h-1200 w-630">
            <img 
                src={imageURL}
                alt="FamilyImage"
                className="relative h-1200 w-630" />

        </div>
    )


}

export default ImageUpload;