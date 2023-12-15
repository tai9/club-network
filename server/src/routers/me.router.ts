import express from "express";
import meController from "../controllers/me.controller";

const meRouters = express.Router();

meRouters.get("/", meController.getInfo);
meRouters.get("/level", meController.getMemberExp);

export default meRouters;
