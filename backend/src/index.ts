import express from "express";
import config from "./config/config.js";
import connectDB from "./db/db.js";
import userRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import commentRouter from "./routes/comment.route.js";
import likeRouter from "./routes/like.route.js";
connectDB();

const app = express();
const PORT = config.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
// app.use(cors({
//     origin:'*',
//     credentials:true,
// }))

app.use("/api/user", userRouter);
app.use("/api/comment", commentRouter);
app.use("/api/like", likeRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
