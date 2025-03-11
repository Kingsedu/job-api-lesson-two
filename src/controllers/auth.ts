import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UserModel } from "@models/model.user";
import BadRequest from "@/errors/bad-request";
import UnAuthenticatedError from "@/errors/unauthentication";
import "express-async-errors";
import jwt from "jsonwebtoken";
import { ModelProps } from "@models/model.user";
export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequest("All fields are required");
  }
  const user = await UserModel.create({ ...req.body });
  const token = user.createJWT();

  res
    .status(StatusCodes.CREATED)
    .json({ message: "succesful", name: user.name, token });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequest("All fields are required");
  }
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  const token = user.createJWT();

  res
    .status(StatusCodes.OK)
    .json({ message: "succesful", name: user.name, token });
};
