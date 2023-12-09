import express from "express";
import permissionController from "../controllers/permission.controller";

const permissionRouters = express.Router();

permissionRouters.get("/", permissionController.getPermissions);
permissionRouters.post("/", permissionController.createPermission);
permissionRouters.delete("/:id", permissionController.deletePermission);

permissionRouters.get(
  "/perm-categories",
  permissionController.getPermCategories
);

export default permissionRouters;
