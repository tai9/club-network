import express from "express";
import postController from "../controllers/post.controller";
import { authenticateToken } from "@/middlewares/authentication";

const postRouters = express.Router();
postRouters.get("/", postController.getPosts);
postRouters.get("/highlight", postController.getHighlightPosts);

postRouters.use(authenticateToken);
postRouters.post("/", postController.createPost);
postRouters.get("/:id", postController.getPost);
postRouters.delete("/:id", postController.deletePost);
postRouters.put("/:id", postController.updatePost);

export default postRouters;
