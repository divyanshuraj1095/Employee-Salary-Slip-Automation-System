import express from "express";
import bcrypt from "bcrypt";
const { validateSinUp } = require('../utils/validate.js');
const authRouter = express.Router();
import Admin from "../models/admin.js";
const validator = require("validator");


authRouter.post("/login", async(req, res)=>{
    try{
        const {eMail,password} = req.body;

        if(!validator.isEmail(eMail)){
            throw new Error("Email is in the wrong format");
        }
        const user = await Admin.findOne({eMail:eMail});
        if(!user){
            throw new Error("Invalid Credentials");
        }
        const valid = await user.bcryptCompare(password);
        if(!valid){
            throw new Error("Inavlid Credentials");   
        }
        const token = await user.getJWT();

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });
        res.send("Loggin Successful!!");
    }
    catch (err:any) {
        console.log(err);
        res.status(400).send("Error: "+err.message);
    }
});