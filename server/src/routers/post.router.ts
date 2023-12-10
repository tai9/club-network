import express from "express";
import postController from "../controllers/post.controller";

const postRouters = express.Router();

postRouters.post("/", postController.createPost);
postRouters.get("/", postController.getPosts);
postRouters.delete("/:id", postController.deletePost);
postRouters.put("/:id", postController.updatePost);

export default postRouters;
