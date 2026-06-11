import mongoose,{ Schema } from "mongoose";
import type { IlikeSchema} from "../types/type.js";


const likeSchema = new Schema<IlikeSchema>({
    videoId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"videos",
    },
    commentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"comments",
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
},{timestamps:true})

likeSchema.pre("validate", function(){
    const hasVideo = Boolean(this.videoId)
    const hasComment = Boolean(this.commentId)
    if(hasVideo === hasComment){
        throw new Error("Like must reference either a video or a comment")
    }
})

const likeModel = mongoose.model("likes",likeSchema)

export default likeModel
