import express from "express";
import {
  getAllJobs,
  getJob,
  createJob,
  deleteAJob,
  deleteAllJobs,
  updateJob,
} from "@controllers/jobs";

const router = express.Router();

router.route("/").get(getAllJobs).post(createJob);
router.route("/:id").get(getJob).delete(deleteAJob).patch(updateJob);
router.route("/").delete(deleteAllJobs);

export default router;
