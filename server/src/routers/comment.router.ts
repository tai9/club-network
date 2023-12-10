import express from "express";
import commentController from "../controllers/comment.controller";

const commentRouters = express.Router();

commentRouters.post("/", commentController.createComment);
commentRouters.get("/", commentController.getComments);
commentRouters.delete("/:id", commentController.deleteComment);
commentRouters.put("/:id", commentController.updateComment);

export default commentRouters;
