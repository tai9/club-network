import { createHmac, timingSafeEqual } from "crypto";
import { Request, Response } from "express";

export const thirdwebCheckoutsWebhookHandler = (
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
    case "transfer:succeeded":
    // Handle when an NFT was delivered.
    case "transfer:failed":
    // Handle when an NFT could not be delivered.
    default:
    // Ignore all other events and return 2xx.
  }

  return res.status(200).send(req.body);
};
