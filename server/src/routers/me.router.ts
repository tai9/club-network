import express from "express";
import meController from "../controllers/me.controller";

const meRouters = express.Router();

meRouters.get("/", meController.getInfo);

export default meRouters;
