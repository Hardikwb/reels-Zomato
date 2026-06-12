import express from "express";
import {
  addComment,
  deleteComment,
  editComment,
} from "../controllers/comment.controller.js";

const commentRouter = express.Router();

commentRouter.post("/comment", addComment);
commentRouter.put("/comment", editComment);
commentRouter.delete("/comment", deleteComment);

export default commentRouter;
