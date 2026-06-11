import { APIError } from "./APIError.js"
import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import config from "../config/config.js";
cloudinary.config({ 
  cloud_name: config.cloud_name!, 
  api_key: config.api_key!, 
  api_secret: config.api_secret!
});

const uploadOnCloudinary = async(filePath:string) => {
    if(!filePath) throw new APIError(400,"FilePath not exists")

    try {
        const result = await cloudinary.uploader.upload(filePath.toString(),{
            resource_type:"auto"
        })
        if(fs.existsSync(filePath)){
            fs.unlinkSync(filePath)
        }
        if(!result) throw new APIError(400,"Unable to upload on cloudinary")
        return result
    } 
    catch (error) {
        if(fs.existsSync(filePath)){
            fs.unlinkSync(filePath)
        }
        throw new APIError(500,"Server error while uploading on cloudinary")
    }
}


const deleteOnCloudinary = async(publicId:string) => {
    if(!publicId) throw new APIError(400,"PublicId not exists")

    const result = await cloudinary.uploader.destroy(publicId.toString())

    if(!result) throw new APIError(400,"Unable to uplaod on cloudinary")
    return result
}

export {uploadOnCloudinary,deleteOnCloudinary}