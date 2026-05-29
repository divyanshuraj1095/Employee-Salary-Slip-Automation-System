import express from "express"
import upload from "../middlewares/multer.middleware";
import parseExcel from "../utils/parseExcel";

const uploadRouter = express.Router();

uploadRouter.post("/upload", upload.single("file"),async(req, res)=>{
    try{
        if(!req.file){
            throw new Error("Please upload a file");
        }
        const data = parseExcel(req.file.path);
        res.json({
            message : "File Uploaded and Parsed Successfully!!",
            data : data
        })
    }
    catch(err:any){
        res.status(400).json({
            message : "Error: "+err.message,
        })
    }
});

export default uploadRouter;