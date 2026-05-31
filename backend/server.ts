import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import connectDB from "./config/db";
import authUser from "./middlewares/auth.middleware";
import cookieParser from "cookie-parser";


import uploadRouter from "./route/uploadRouter";
import generateRouter from "./route/generateRouter";
import sendEmailRouter from "./route/sendEmailRouter";
import employeeRouter from "./route/employeeRouter";
import authRouter from "./route/authRouter";
import dashboardRouter from "./route/dashboardRouter";

const app = express();

["uploads", "pdfs"].forEach((dir) => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

app.use(cookieParser());



const frontendOrigin = process.env.FRONTEND_URL || "http://localhost:5173";

console.log(`CORS allowed origin: ${frontendOrigin}`);

app.use(
  cors({
    origin: frontendOrigin,
    credentials: true,
  }),
);
app.use(express.json());
app.use("/pdfs", express.static(path.join(__dirname, "pdfs")));

app.use("/", authRouter);
app.use("/", authUser, uploadRouter);
app.use("/", authUser, generateRouter);
app.use("/", authUser,  sendEmailRouter);
app.use("/", authUser, employeeRouter);
app.use("/", authUser, dashboardRouter);

connectDB()
  .then(() => {
    console.log("Database Connected!!");
    app.listen(7777, () => {
      console.log("Connected to port 7777");
    });
  })
  .catch((err: unknown) => {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("MongoDB connection failed:", message);
    process.exit(1);
  });

