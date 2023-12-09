import express from "express";
import roleController from "../controllers/role.controller";

const roleRouters = express.Router();

roleRouters.post("/", roleController.createRole);
roleRouters.get("/", roleController.getRoles);
roleRouters.delete("/:id", roleController.deleteRole);
roleRouters.put("/:id", roleController.updateRole);

export default roleRouters;
