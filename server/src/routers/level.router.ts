import express from "express";
import levelController from "../controllers/level.controller";

const levelRouters = express.Router();

levelRouters.post("/", levelController.createLevel);
levelRouters.get("/", levelController.getLevels);
levelRouters.delete("/:id", levelController.deleteLevel);
levelRouters.put("/:id", levelController.updateLevel);

export default levelRouters;
