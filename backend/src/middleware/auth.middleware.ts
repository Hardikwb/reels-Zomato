import jwt from "jsonwebtoken";
import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../types/type.js";
import { APIError } from "../utils/APIError.js";
import config from "../config/config.js";
import userModel from "../models/user.models.js";

interface DecodedToken {
  _id: string;
  username: string;
  email: string;
}

const authMiddleWare = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const accessToken = req.cookies?.accessToken;

    if (!accessToken) throw new APIError(400, "User not logged in");

    const decodedToken = jwt.verify(
      accessToken,
      config.ACCESS_TOKEN_SECRET!,
    ) as DecodedToken;

    const user = await userModel.findById(decodedToken._id);

    if (!user) throw new APIError(400, "Invalid token");
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(new APIError(401, "Access token expired"));
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return next(new APIError(400, "Invalid access token"));
    }

    if (error instanceof Error) {
      return next(new APIError(500, error.message));
    }

    return next(new APIError(500, "Something went wrong"));
  }
};

export default authMiddleWare;
