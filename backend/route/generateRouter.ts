import express from "express";
import generatePDF from "../utils/generatePDF";
import Employee from "../models/employee";

const generateRouter = express.Router();

generateRouter.post("/generate", async(req, res)=>{
    try{
        const employees = await Employee.find();
        if(employees.length == 0){
            throw new Error("Employee not found");
        }

        for(const employee of employees){
            generatePDF(employee);
        }

        res.json({
            message : "PDF Generated Successfully"
        });
    }
    catch(err:any){
        res.status(400).json({
            message : "Error: "+err.message
        });
    }
});

export default generateRouter;