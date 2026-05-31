import express from "express";
const { validateSinUp } = require('../utils/validate.js');
const authRouter = express.Router();
import Admin from "../models/admin.js";
const validator = require("validator");


import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

authRouter.post("/login", async (req, res) => {
  try {
    const { eMail, password } = req.body;

    if (!validator.isEmail(eMail)) {
      throw new Error("Email is in the wrong format");
    }

    const user = await Admin.findOne({ eMail });

    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error("Invalid Credentials");
    }

    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true after deployment with HTTPS
      sameSite: "lax"
    });

    res.send("Login Successful!!");
  } catch (err: any) {
    console.log(err);
    res.status(400).send("Error: " + err.message);
  }
});