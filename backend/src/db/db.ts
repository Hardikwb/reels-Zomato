import mongoose from "mongoose"
import config from "../config/config.js"

let cached = global.mongoose

const MONGODB_URI = config.MONGODB_URI!


if(!cached){
    cached = global.mongoose = {connection:null, promise:null}
}


const connectDB=async()=>{
    if(cached.connection){
        return cached.connection
    }
    if(!cached.promise){
        cached.promise = mongoose.connect(MONGODB_URI).then(()=>mongoose.connection)
    }
    try {
        const connection = await cached.promise;
        console.log("Connected to DB successfully")
        return connection.connection
    } 
    catch (error) {
        cached.promise = null
        throw error
    }
    finally{
        return cached.connection
    }
}
export default connectDB