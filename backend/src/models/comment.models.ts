import mongoose, { Schema } from "mongoose";
import type { IcommentSchema } from "../types/type.js";

const commentSchema = new Schema<IcommentSchema>(
  {
    content: {
      type: String,
      required: [true, "Enter something"],
      minLength: [5, "Minimum of 5 Character"],
    },
    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "videos",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    parentCommentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comments",
      default: null,
    },
  },
  { timestamps: true },
);

const commentModel = mongoose.model("comments", commentSchema);
export default commentModel;
