import mongoose,{Schema} from "mongoose";
import type { IvideoSchema } from "../types/type.js";
const videoSchema = new Schema<IvideoSchema>({
      title:{
        type:String,
        required:[true,"title is required"],
        minLength:[3,"Length of title should be of atleast 3 character"]
    },
    description:{
        type:String,
        required:[true,"title is required"],
      },
    restaurent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"restaurents",
        required:true,
    },
      
},{timestamps:true})

const videoModel = mongoose.model("videos",videoSchema)
export default videoModel
