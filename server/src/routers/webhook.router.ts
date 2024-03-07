import express from "express";
import { thirdwebCheckoutsWebhookHandler } from "@/webhooks/payment.webhook";

const webhookRouters = express.Router();

webhookRouters.post("/payment", thirdwebCheckoutsWebhookHandler);

export default webhookRouters;
