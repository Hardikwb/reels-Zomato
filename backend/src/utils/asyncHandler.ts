import type {Request, Response, NextFunction} from "express"
import type { TRequestHandler } from "../types/type.js"

const asyncHandler = function(requestHandler:TRequestHandler){
    return (
        req:Request,
        res:Response,
        next:NextFunction)=>{
            Promise
            .resolve(requestHandler(req,res,next))
            .catch((err)=>next(err))
        }
}
export default asyncHandler