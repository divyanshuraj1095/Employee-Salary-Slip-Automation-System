import express from "express";
import connectDB from "./config/db";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use("/", (req, res)=>{
    res.send("Backend is running")
});

connectDB()
.then(()=>{
    console.log("Database Connected!!");
    app.listen(7777,()=>{
        console.log("Connected to port 7777");
    });
});

