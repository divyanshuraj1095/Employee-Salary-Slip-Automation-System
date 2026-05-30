import express from "express";
import { sendEmail } from "../utils/sendEmail";
import Employee from "../models/employee";

const sendEmailRouter = express.Router();

sendEmailRouter.post("/sendEmail", async(req, res)=>{
    try{
        let successCount = 0;
        let failureCount = 0;
        const employees = await Employee.find();
        if(employees.length == 0){
            throw new Error("Employee not found");
        }
        for(const employee of employees){
            try{
               const pdfPath : any = `pdf/${employee.employeeId}-${employee.month}-${employee.year}.pdf`;
               await sendEmail(employee.email, pdfPath);
               successCount++;

            }
            catch(err:any){
               failureCount++;
               console.log(err);  
            }
        }

        res.json({
            message : "Email send successfully",
            emailSend : successCount,
            emailFailed : failureCount
        })
    }
    catch(err:any){
        res.status(400).json({
            message : "Error: "+err.message
        })
    }

});

export default sendEmailRouter;