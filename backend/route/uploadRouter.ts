import express from "express"
import upload from "../middlewares/multer.middleware";
import parseExcel from "../utils/parseExcel";
import Employee from "../models/employee";
import { logActivity } from "../utils/logActivity";

const uploadRouter = express.Router();

uploadRouter.post("/upload", upload.single("file"),async(req, res)=>{
    try{
        if(!req.file){
            throw new Error("Please upload a file");
        }
        const data = parseExcel(req.file.path);
        console.log(data);
        await Employee.insertMany(data);
        await logActivity(
            "upload",
            "File Uploaded",
            `${req.file.originalname} — ${data.length} records`,
            { count: data.length, fileName: req.file.originalname },
        );
        res.json({
            message   : "File Uploaded and Parsed Successfully!!",
            employees : data
        })
    }
    catch(err:any){
        res.status(400).json({
            message : "Error: "+err.message,
        })
    }
});

export default uploadRouter;