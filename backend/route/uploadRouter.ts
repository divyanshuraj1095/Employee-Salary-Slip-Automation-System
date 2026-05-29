import express from "express"
import upload from "../middlewares/multer.middleware";
const uploadRouter = express.Router();

uploadRouter.post("/upload", upload.single("file"),async(req, res)=>{
    try{
        if(!req.file){
            throw new Error("Please upload a file");
        }
        res.json({
            message : "File Uploaded Successfully!!",
            file : req.file
        })
    }
    catch(err:any){
        res.status(400).json({
            message : "Error: "+err.message,
        })
    }
})

export default uploadRouter