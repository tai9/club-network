import express from "express";
import levelController from "../controllers/level.controller";
import { authenticateToken } from "@/middlewares/authentication";

const levelRouters = express.Router();

levelRouters.get("/", levelController.getLevels);

levelRouters.use(authenticateToken);
levelRouters.post("/", levelController.createLevel);
levelRouters.delete("/:id", levelController.deleteLevel);
levelRouters.put("/:id", levelController.updateLevel);

export default levelRouters;
