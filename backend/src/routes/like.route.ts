import { commentLike, videoLike } from "../controllers/like.controller.js";
import express from "express";

const likeRouter = express.Router();

likeRouter.post("/toggle/v", videoLike);
likeRouter.post("/toggle/c", commentLike);

export default likeRouter;
