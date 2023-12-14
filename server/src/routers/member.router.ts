import express from "express";
import memberController from "../controllers/member.controller";
import { authenticateToken } from "@/middlewares/authentication";

const memberRouters = express.Router();

memberRouters.post("/", memberController.createMember);

memberRouters.use(authenticateToken);
memberRouters.get("/", memberController.getMembers);
memberRouters.delete("/:id", memberController.deleteMember);

export default memberRouters;
