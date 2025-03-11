import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "please Provide Company"],
    },
    position: {
      type: String,
      required: [true, "please provide position"],
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "UserModel",
      required: [true, "please provide user"],
    },
  },
  { timestamps: true }
);

export const JobModel = mongoose.model("JobModel", JobSchema);
