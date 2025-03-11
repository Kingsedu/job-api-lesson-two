import CustomAPIError from "@/errors/custom-api";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

//?middleware for error handleing
interface ErrorRequestStatus extends Error{
  statusCode: number;
  code?: number
}
const errorHandleMiddleware = (
  err: ErrorRequestStatus,
  req: Request,
  res: Response,
  next: NextFunction
) => {
   let customeError = {
     statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
     message: err.message || "something went wrong try again later",
   };
  if (err instanceof CustomAPIError) {
     res.status(err.statusCode).json({ msg: err.message });
  }
  if(err.code && err.code === 11000){
    customeError.message = `Duplicate value entered`
    customeError.statusCode = StatusCodes.CONFLICT;
  }
  res.status(customeError.statusCode).json({ msg: customeError.message });
  next();
};

export default errorHandleMiddleware;
