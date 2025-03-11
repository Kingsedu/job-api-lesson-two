import express from "express";
import { logger } from "./utils/utils";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import "express-async-errors";
import errorHandleMiddleware from "./middleware/error-handler";
import NotFoundMiddleWare from "./middleware/not-found";
import authRouter from "./routes/auth";
import jobsRouter from "./routes/jobs";
import connectDB from "db/connectdb";
import auth from "./middleware/authentication";
import {rateLimit} from "express-rate-limit";

dotenv.config();
const app = express();
const portNumber = process.env.PORT;
const mongo_Url = process.env.MONGO_URL as string;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});

app.use(limiter)
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", auth, jobsRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(NotFoundMiddleWare);
app.use(errorHandleMiddleware);

const startConnection = async () => {
  try {
    await connectDB(mongo_Url);
    logger.info("Connected to MongoDB");
    app.listen(portNumber, () => {
      logger.info(`Server is running on port http://localhost:${portNumber}`);
    });
  } catch (err: any) {
    logger.error(`Error starting server: ${err.message}`);
    process.exit(1);
  }
};

startConnection();
