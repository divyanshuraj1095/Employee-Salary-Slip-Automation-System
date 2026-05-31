import express from "express";
import fs from "fs";
import path from "path";
import Employee from "../models/employee";
import Activity from "../models/activity";

const dashboardRouter = express.Router();

dashboardRouter.get("/dashboard/stats", async (_req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments();

    const pdfsDir = path.join(__dirname, "../pdfs");
    const slipsGenerated = fs.existsSync(pdfsDir)
      ? fs.readdirSync(pdfsDir).filter((f) => f.endsWith(".pdf")).length
      : 0;

    const emailActivities = await Activity.find({ type: "email" });
    const emailsSent = emailActivities.reduce(
      (sum, item) => sum + (Number(item.meta?.sent) || 0),
      0,
    );

    res.json({ totalEmployees, slipsGenerated, emailsSent });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(400).json({ message: `Error: ${message}` });
  }
});

dashboardRouter.get("/dashboard/activity", async (_req, res) => {
  try {
    const activities = await Activity.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    res.json({
      activities: activities.map((item) => ({
        id: String(item._id),
        type: item.type,
        title: item.title,
        detail: item.detail,
        timestamp: item.createdAt,
      })),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(400).json({ message: `Error: ${message}` });
  }
});

export default dashboardRouter;
