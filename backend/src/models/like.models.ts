import mongoose,{ Schema } from "mongoose";
import type { IlikeSchema} from "../types/type.js";


const likeSchema = new Schema<IlikeSchema>({
    like:{
        type:Number,
        default:0,
    },
    videoId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"vidoes",
        required:true
    }
},{timestamps:true})

const likeModel = mongoose.model("likes",likeSchema)

export default likeModel