import express from "express";
import ticketController from "../controllers/ticket.controller";

const ticketRouters = express.Router();

ticketRouters.get("/", ticketController.getAll);
ticketRouters.post("/", ticketController.create);
ticketRouters.post(
  "/:ticketId/publish",
  ticketController.configureClaimConditions
);

export default ticketRouters;
