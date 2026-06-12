import express from "express";
import authMiddleWare from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";
import {
  getUserDetails,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter
  .route("/register")
  .post(upload.fields([{ name: "avatar", maxCount: 1 }]), registerUser);

userRouter.route("/login").post(loginUser);

userRouter.route("/logout").get(logoutUser);
userRouter.route("/getDetails").get(authMiddleWare, getUserDetails);

// userRouter.route("/register",upload,registerUser)
// userRouter.post("/login",authMiddleWare,)

export default userRouter;
