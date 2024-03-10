import express from "express";
import {
  login,
  loginByEmail,
  verifyMemberByEmail,
} from "@/controllers/auth.controller";

const publicRouters = express.Router();

publicRouters.post("/login", login);
publicRouters.post("/login/verify", verifyMemberByEmail);
publicRouters.post("/login/email", loginByEmail);

export default publicRouters;
