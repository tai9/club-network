import express from "express";
import reactionController from "../controllers/reaction.controller";

const reactionRouters = express.Router();

reactionRouters.post("/", reactionController.createReaction);
reactionRouters.get("/", reactionController.getReactions);
reactionRouters.delete("/:id", reactionController.deleteReaction);
reactionRouters.put("/:id", reactionController.updateReaction);

export default reactionRouters;
