import { Ticket } from "@/entities";
import activityService from "@/services/activity.service";
import memberService from "@/services/member.service";
import ticketService from "@/services/ticket.service";
import { createHmac, timingSafeEqual } from "crypto";
import { Request, Response } from "express";

export const thirdwebCheckoutsWebhookHandler = async (
  req: Request,
  res: Response
) => {
  const apiKey = process.env.THIRDWEB_API_SECRET_KEY; // Your thirdweb payments secret key

  // Get the provided signature.
  const signature = req.headers["x-thirdweb-signature"] as string;
  // Compute the expected signature.
  const hash = createHmac("sha256", apiKey)
    .update(JSON.stringify(req.body)) // {"event":"transfer:succeeded","result":{"id":...
    .digest("hex");
  // Confirm the provided signature matches.
  if (!timingSafeEqual(Buffer.from(signature), Buffer.from(hash))) {
    return res.status(400).send("Signature mismatch!");
  }

  switch (req.body.event) {
    case "transfer:succeeded": {
      const tokenId = req.body.result.contractArgs.tokenId;
      const email = req.body.result.email;
      const purchaseTicket = await ticketService.getTicketByTokenId(tokenId);
      const member = await memberService.getMemberByEmail(email);

      const ticket = new Ticket();
      ticket.tokenId = purchaseTicket.tokenId;
      ticket.name = purchaseTicket.name;
      ticket.image = purchaseTicket.image;
      ticket.description = purchaseTicket.description;
      ticket.createdBy = purchaseTicket.createdBy;
      ticket.owner = member;
      ticket.type = "asset";
      ticket.status = "PURCHASED";

      await ticketService.createTicket(ticket);
      await activityService.createActivity({
        type: "TICKET",
        status: "SUCCESS",
        description: "Purchased a ticket",
        data: JSON.stringify(req.body.result),
        createdBy: member.id,
      });
      break;
    }
    case "transfer:failed": {
      await activityService.createActivity({
        type: "TICKET",
        status: "FAIL",
        description: "Cannot purchase a ticket",
        data: JSON.stringify(req.body.result),
      });
      break;
    }

    default:
    // Ignore all other events and return 2xx.
  }

  return res.status(200).send("ok");
};
