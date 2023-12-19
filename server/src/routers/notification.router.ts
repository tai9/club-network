import express from "express";
import notificationController from "../controllers/notification.controller";

const notificationRouters = express.Router();

notificationRouters.get("/", notificationController.getNotifications);
notificationRouters.get("/count", notificationController.getNotificationCOunt);
notificationRouters.post("/", notificationController.readAllNotifications);
notificationRouters.put("/:id", notificationController.readNotification);

export default notificationRouters;
