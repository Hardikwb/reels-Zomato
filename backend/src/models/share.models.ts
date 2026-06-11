import mongoose,{ Schema } from "mongoose";
import type { IshareSchema } from "../types/type.js";


const shareSchema = new Schema<IshareSchema>({
    share:{
        type:Number,
        default:0,
    },
    videoId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"videos",
    },
    commentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"comments",
    },
},{timestamps:true})

shareSchema.pre("validate", function(){
    const hasVideo = Boolean(this.videoId)
    const hasComment = Boolean(this.commentId)
    if(hasVideo === hasComment){
        throw new Error("Share must reference either a video or a comment")
    }
})

const shareModel = mongoose.model("shares",shareSchema)
export default shareModel
