import express from "express";
import activityController from "../controllers/activity.controller";

const activityRouters = express.Router();

activityRouters.get("/", activityController.getActivities);

export default activityRouters;
