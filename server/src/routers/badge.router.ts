import express from "express";
import badgeController from "../controllers/badge.controller";

const badgeRouters = express.Router();

badgeRouters.post("/", badgeController.createBadge);
badgeRouters.get("/", badgeController.getBadges);
badgeRouters.delete("/:id", badgeController.deleteBadge);
badgeRouters.put("/:id", badgeController.updateBadge);

export default badgeRouters;
