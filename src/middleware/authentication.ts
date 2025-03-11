import { UserModel } from "@models/model.user";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import UnAuthenticatedError from "@/errors/unauthentication";

export interface RequestUser extends Request {
  user?: {
    userId: string;
    name: string;
  };
}

const isJwtPayloadWithUser = (
  payload: any
): payload is JwtPayload & { userId: string; name: string } => {
  return (
    payload &&
    typeof payload === "object" &&
    "userId" in payload &&
    "name" in payload
  );
};

const auth = (req: RequestUser, res: Response, next: NextFunction) => {
  //check header;
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnAuthenticatedError("Authentication invalid");
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string);
    //attach the user to the job route
    if (!isJwtPayloadWithUser(payload)) {
      throw new UnAuthenticatedError("Invalid token payload");
    }
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (err) {
    throw new UnAuthenticatedError("Authentication invalid");
  }
};

export default auth;
