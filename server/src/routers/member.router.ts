import express from "express";
import memberController from "../controllers/member.controller";

const memberRouters = express.Router();

memberRouters.post("/", memberController.createMember);
memberRouters.get("/", memberController.getMembers);
memberRouters.delete("/:id", memberController.deleteMember);

export default memberRouters;
