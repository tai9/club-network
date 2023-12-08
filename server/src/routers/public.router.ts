import express from "express";
import { login } from "@/controllers/auth.controller";

const publicRouters = express.Router();

publicRouters.post("/login", login);

export default publicRouters;
