import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import connectDB from "./config/db";
import authUser from "./middlewares/auth.middleware";

import uploadRouter from "./route/uploadRouter";
import generateRouter from "./route/generateRouter";
import sendEmailRouter from "./route/sendEmailRouter";
import employeeRouter from "./route/employeeRouter";
import authRouter from "./route/authRouter";

const app = express();

const frontendOrigin = process.env.FRONTEND_URL || "http://localhost:5173";

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

connectDB()
.then(()=>{
    console.log("Database Connected!!");
    app.listen(7777,()=>{
        console.log("Connected to port 7777");
    });
});

