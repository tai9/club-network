import express from "express";
import memberController from "../controllers/member.controller";
import { authenticateToken } from "@/middlewares/authentication";

const memberRouters = express.Router();

memberRouters.post("/", memberController.createMember);
memberRouters.get("/:id/exp", memberController.getMemberExp);
memberRouters.get("/", memberController.getMembers);
memberRouters.get("/:id", memberController.getMember);

memberRouters.use(authenticateToken);
memberRouters.post("/upload", memberController.uploadCsv);
memberRouters.get("/export-csv", memberController.exportMembersCsv);
memberRouters.post("/bulk-create", memberController.bulkCreateMembers);
memberRouters.delete("/:id", memberController.deleteMember);
memberRouters.put("/:id", memberController.updateMember);

export default memberRouters;
