import {v2 as cloudinary} from "cloudinary";
import fs from 'fs';

class Cloudinary{
    
    CLOUDINARY_NAME;
    CLOUDINARY_API_KEY;
    CLOUDINARY_API_SECRET;

    constructor(cloudinaryName, cloudinaryApiKey, cloudinarySecret){
        this.CLOUDINARY_NAME = cloudinaryName;
        this.CLOUDINARY_API_KEY = cloudinaryApiKey;
        this.CLOUDINARY_API_SECRET = cloudinarySecret;

        cloudinary.config({
            cloud_name: this.CLOUDINARY_NAME,
            api_key: this.CLOUDINARY_API_KEY,
            api_secret: this.CLOUDINARY_API_SECRET
        });
    }

    async uploadOnCloudinary(cloudinary, localFilePath){
        try{
            if(!localFilePath) return null;
            const response = await cloudinary.uploader.upload(
                localFilePath, {
                    resource_type: "auto"
                }
            )
            if(response?.url){
                // Delete the file in the server, after successfull cloudinary uploaded response 🚀
                fs.unlinkSync(localFilePath);
            }
        }catch(error){
            fs.unlinkSync(localFilePath);
            return null;
        }
    }


}

export default Cloudinary;