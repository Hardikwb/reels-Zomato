import dotenv from "dotenv"
dotenv.config()
const config={
    PORT:3000,
    MONGODB_URI:process.env.MONGODB_URI,
    ACCESS_TOKEN_SECRET:process.env.ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRY:process.env.ACCESS_TOKEN_EXPIRY,
    REFRESH_TOKEN_SECRET:process.env.REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRY:process.env.REFRESH_TOKEN_EXPIRY,
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
}

export default config