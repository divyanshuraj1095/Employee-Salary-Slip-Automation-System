import express from "express";
const authRouter = express.Router();
const validator = require("validator");
import jwt from "jsonwebtoken";

authRouter.post("/login", async (req, res) => {
  try {
    const { eMail, password } = req.body;

    if (!validator.isEmail(eMail)) {
      throw new Error("Invalid Credentials");
    }
    
    if(eMail != process.env.EMAIL || password != process.env.EMAIL_PASSWORD){
        throw new Error("Invalid Credentials")
    }

    const token = jwt.sign(
      { eMail : eMail },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax"
    });

    res.send("Login Successful!!");
  } catch (err: any) {
    console.log(err);
    res.status(400).send("Error: " + err.message);
  }
});

export default authRouter;