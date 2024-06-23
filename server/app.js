import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { ApiError } from "./utils/ApiError.js";

const app = express();

app.use(
   cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
   })
);

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.resolve();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static(path.join(__dirname, "client/dist")));
app.use(cookieParser());

import userRouter from "./routes/user.route.js";
import messageRouter from "./routes/message.route.js";
import postRouter from "./routes/post.route.js";
import connectionRouter from "./routes/follow.route.js";
import notificationRouter from "./routes/notification.route.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/connection", connectionRouter);
app.use("/api/v1/notification", notificationRouter);

app.use((err, req, res, next) => {
   if (err instanceof ApiError) {
      res.status(err.statusCode).json({
         success: false,
         message: err.message,
         errors: err.errors,
      });
   } else {
      console.error(err);
      res.status(500).json({
         success: false,
         message: err.message,
      });
   }
});

export { app };
