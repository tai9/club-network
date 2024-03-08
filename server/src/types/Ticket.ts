import { IMember } from "./Member";
import { IBaseEntity } from "./common";

export type TicketType = "ticket" | "asset";

export type TicketStatus = "PURCHASED" | "TRANSFERED" | "BURNED";

export interface ITicket extends IBaseEntity {
  name: string;
  image: string; // ipfs format
  description?: string;
  tokenId?: string;
  createdBy: IMember;
  owner?: IMember;
  expireAt?: number;
  status?: TicketStatus;
  type?: TicketType;

  // claim conditions
  supply: number;
  quantity: number;
  defaultPrice: number;

  // payment
  checkoutUrl?: string;
}

export interface IGetTicketsParams {
  order?: string[];
  page?: number;
  limit?: number;
  search?: string;
}
