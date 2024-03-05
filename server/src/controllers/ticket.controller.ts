import { Request, Response } from "express";
import { constants } from "http2";
import fs from "fs";
import sharp from "sharp";
import { sdk } from "@/configs/contract.config";
import ticketService from "@/services/ticket.service";
import { Member, Ticket } from "@/entities";
import memberService from "@/services/member.service";
import Joi from "joi";

const getAll = async (req: Request, res: Response) => {
  try {
    const tickets = await ticketService.getTickets();
    return res.status(constants.HTTP_STATUS_OK).json(tickets);
  } catch (error) {
    console.log(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

const createTicketSchema = Joi.object<{ name: string; description?: string }>({
  name: Joi.string().required(),
  description: Joi.string().allow(null, "").optional(),
});
const create = async (req: Request, res: Response) => {
  try {
    const member = (req as any)?.member as Member;
    const fileBuffer = await sharp(req.file.buffer).toBuffer();
    const contract = await sdk.getContract(
      process.env.CLUBNETWORK_CONTRACT_ADDRESS
    );

    const { name, description } = await createTicketSchema.validateAsync(
      req.body
    );

    // Custom metadata of the NFTs to create
    const metadatas = [
      {
        name,
        description,
        image: fileBuffer, // This can be an image url or file
      },
    ];

    const results = await contract.erc1155.lazyMint(metadatas); // uploads and creates the NFTs on chain
    const firstNFT = await results[0].data(); // (optional) fetch details of the first created NFT

    const ticket = new Ticket();
    ticket.tokenId = firstNFT.id;
    ticket.name = firstNFT.name as string;
    ticket.image = firstNFT.image;
    ticket.description = firstNFT.description;
    ticket.createdBy = member;
    ticket.owner = member;

    const ticketCreated = await ticketService.createTicket(ticket);
    res.status(constants.HTTP_STATUS_OK).json(ticketCreated);
  } catch (error) {
    console.log(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

const configureClaimConditions = async (req: Request, res: Response) => {
  try {
    const tokenId = req.params.tokenId;
    const contract = await sdk.getContract(
      process.env.CLUBNETWORK_CONTRACT_ADDRESS
    );
    // Please set your price to 0.005 ETH or lower on testnet
    const claimConditions = [
      {
        startTime: new Date(), // start the presale now
        maxClaimableSupply: 2, // limit how many mints for this presale
        price: 0.005, // presale price
      },
    ];
    await contract.erc1155.claimConditions.set(tokenId, claimConditions);
    // TODO: save to DB
    res.status(constants.HTTP_STATUS_OK).json({ tokenId });
  } catch (error) {
    console.log(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

export default {
  getAll,
  create,
  configureClaimConditions,
};
