import express from "express";
import connectDB from "./config/db";
import dotenv from "dotenv";
import uploadRouter from "./route/uploadRouter";
import generateRouter from "./route/generateRouter";

const app = express();
dotenv.config();

// app.use("/", (req, res)=>{
//     res.send("Payroll backend is running")
// });
app.use("/", uploadRouter);
app.use("/", generateRouter);

connectDB()
.then(()=>{
    console.log("Database Connected!!");
    app.listen(7777,()=>{
        console.log("Connected to port 7777");
    });
});

