import express from "express";
import Employee from "../models/employee";

const employeeRouter = express.Router();

employeeRouter.get("/employees", async (_req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.json({ employees });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(400).json({ message: `Error: ${message}` });
  }
});

export default employeeRouter;
