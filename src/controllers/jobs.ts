import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { RequestUser } from "src/middleware/authentication";
import { JobModel } from "@models/model.jobs";
import BadRequest from "@/errors/bad-request";
import UnAuthenticatedError from "@/errors/unauthentication";
import NotFound from "@/errors/not-found";

export const getAllJobs = async (req: RequestUser, res: Response) => {
  const jobs = await JobModel.find({ createdBy: req.user?.userId }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};
export const getJob = async (req: RequestUser, res: Response) => {
  const { id: jobId } = req.params;
  if (!req.user) {
    throw new UnAuthenticatedError("Unauthorized to access this resource");
  }
  const { userId, name } = req.user;
  const job = await JobModel.findOne({
    _id: jobId,
    createdBy: userId,
  });
  if (!job) {
    throw new NotFound("Job not found");
  }
  res.status(StatusCodes.OK).json(job);
};
export const createJob = async (req: RequestUser, res: Response) => {
  const { company, position, createBy } = req.body;
  if (!company || !position) {
    throw new BadRequest("All fields are required");
  }
  req.body.createdBy = req.user?.userId;
  const job = await JobModel.create(req.body);
  console.log(company, position);
  res.status(StatusCodes.CREATED).json({ job }); //
  // res.send(`this is the ${company} and this is the position${position}`);
};
export const updateJob = async (req: RequestUser, res: Response) => {
  const { id: jobId } = req.params;
  const { company, position } = req.body;
  if (!req.user) {
    throw new UnAuthenticatedError("Unauthorized to access this resource");
  }
  const { userId, name } = req.user;
  if (company === "" || position === "") {
    throw new BadRequest("all fields are required");
  }
  const job = await JobModel.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new NotFound("Job not found");
  }
  res.status(StatusCodes.OK).json(job);
};
export const deleteAJob = async (req: RequestUser, res: Response) => {
  const { id: jobId } = req.params;
  if (!req.user) {
    throw new UnAuthenticatedError("Unauthorized to access this resource");
  }
  const { userId, name } = req.user;
  const job = await JobModel.findByIdAndDelete({
    _id: jobId,
    createdBy: userId,
  });({
    _id: jobId,
    createdBy: userId,
  });
   if (!job) {
     throw new NotFound("Job not found");
   }
   res.status(StatusCodes.OK).json({message: "job deleted"});
};

export const deleteAllJobs = async (req: RequestUser, res: Response) => {
  if (!req.user) {
    throw new UnAuthenticatedError("Unauthorized to access this resource");
  }
  const { userId } = req.user;
  if (userId) {
    // const jobs = await JobModel.findById()
  }
  res.send("delete all jobs");
};
