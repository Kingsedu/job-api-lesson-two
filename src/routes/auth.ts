import { register, login } from "@controllers/auth";
import express from "express";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);

export default router;
