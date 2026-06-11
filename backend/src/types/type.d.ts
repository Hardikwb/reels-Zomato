import type { HydratedDocument, Types } from "mongoose";
import type { NextFunction, Request, Response } from "express";

interface Iaddress {
  pincode: string;
  locality: string;
  district: string;
  state: string;
}

interface IuserSchema {
  _id?: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  mobileNumber: string;
  refreshToken?: string;
  avatarURL?: string;
  avatarPublicId?: string;
  address: Iaddress;
  isModified: (field?: string) => boolean;
  generateAccessToken: () => string;
  generateRefreshToken: () => string;
  isValidPassword: (password: string) => Promise<boolean>;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IrestaurentSchema {
  _id?: Types.ObjectId;
  owner?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  mobileNumber: string;
  rating: number;
  refreshToken?: string;
  avatarURL?: string;
  avatarPublicId?: string;
  address: Iaddress;
  isModified: (field?: string) => boolean;
  generateAccessToken: () => string;
  generateRefreshToken: () => string;
  isValidPassword: (password: string) => Promise<boolean>;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IvideoSchema {
  _id?: Types.ObjectId;
  restaurent?: Types.ObjectId;
  title: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IlikeSchema {
  _id?: Types.ObjectId;
  videoId?: Types.ObjectId;
  userId: Types.ObjectId;
  commentId?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IcommentSchema {
  _id?: Types.ObjectId;
  content: string;
  videoId: Types.ObjectId;
  userId: Types.ObjectId;
  parentCommentId?: Types.ObjectId | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IshareSchema {
  _id?: Types.ObjectId;
  videoId?: Types.ObjectId;
  commentId?: Types.ObjectId;
  share: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type TRequestHandler = (
  req: Request,
  res: Response,
  next?: NextFunction,
) => Promise<any>;

interface AuthRequest extends Request {
  user?: HydratedDocument<IuserSchema>;
}

export type {
  Iaddress,
  IuserSchema,
  IrestaurentSchema,
  IvideoSchema,
  IlikeSchema,
  IcommentSchema,
  IshareSchema,
  TRequestHandler,
  AuthRequest,
};
