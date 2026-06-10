import mongoose,{ Schema } from "mongoose";
import type { IshareSchema } from "../types/type.js";


const shareSchema = new Schema<IshareSchema>({
    share:{
        type:Number,
        default:0,
    },
    videoId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"vidoes",
        required:true
    }
},{timestamps:true})

const shareModel = mongoose.model("shares",shareSchema)
export default shareModel