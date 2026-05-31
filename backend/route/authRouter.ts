import express from "express";
import validator from "validator";
import jwt from "jsonwebtoken";
import authUser from "../middlewares/auth.middleware";

const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
  try {
    const eMail = req.body.eMail || req.body.email;

    if (!eMail || !validator.isEmail(eMail)) {
      throw new Error("Invalid credentials");
    }

    if (
      eMail !== process.env.EMAIL ||
      req.body.password !== process.env.EMAIL_PASSWORD
    ) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      { eMail },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    res.json({
      message: "Login successful",
      email: eMail,
      name: "Admin",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Login failed";
    res.status(401).json({ message });
  }
});

authRouter.post("/logout", (_req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
  res.json({ message: "Logged out successfully" });
});

authRouter.get("/me", authUser, (req: express.Request & { user?: { eMail: string } }, res) => {
  res.json({
    email: req.user?.eMail,
    name: "Admin",
  });
});

export default authRouter;
