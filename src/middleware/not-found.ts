import { Request, Response, NextFunction } from "express";

const NotFoundMiddleWare = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404).send("Route does not exist");
  next();
};

export default NotFoundMiddleWare;
