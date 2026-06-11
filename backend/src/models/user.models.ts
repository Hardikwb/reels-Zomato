import mongoose, { Schema } from "mongoose";
import type { IuserSchema } from "../types/type.js";
import bcrypt from "bcryptjs";
import config from "../config/config.js";
import jwt from "jsonwebtoken";
import type { StringValue } from "ms";
const userSchema = new Schema<IuserSchema>(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      unique: [true, "Email already exists"],
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email is not valid",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: 6,
      maxLength: 15,
      select: false,
    },
    avatarURL: {
      type: String,
    },
    avatarPublicId: {
      type: String,
    },
    mobileNumber: {
      type: String,
      required: [true, "Mobile number is required"],
      match: [/^[0-9]{10}$/, "Mobile number must be 10 digits"],
    },
    address: {
      pincode: {
        type: String,
        required: [true, "pincode is required"],
      },
      locality: {
        type: String,
        required: [true, "locality is required"],
      },
      district: {
        type: String,
        required: [true, "district is required"],
      },
      state: {
        type: String,
        required: [true, "state is required"],
      },
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true },
);

userSchema.pre<IuserSchema>("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password as string, salt);
});

userSchema.methods.generateAccessToken = function () {
  const accessToken = jwt.sign(
    { _id: this._id, username: this.username, email: this.email },
    config.ACCESS_TOKEN_SECRET as string,
    { expiresIn: config.ACCESS_TOKEN_EXPIRY as StringValue },
  );
  return accessToken;
};

userSchema.methods.generateRefreshToken = function () {
  const refreshToken = jwt.sign(
    { _id: this._id },
    config.REFRESH_TOKEN_SECRET as string,
    { expiresIn: config.REFRESH_TOKEN_EXPIRY as StringValue },
  );
  return refreshToken;
};

userSchema.methods.isValidPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

const userModel = mongoose.model("users", userSchema);

export default userModel;
