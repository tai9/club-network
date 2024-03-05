import { IMember } from "./Member";
import { IBaseEntity } from "./common";

export interface ITicket extends IBaseEntity {
  name: string;
  image: string; // ipfs format
  description?: string;
  tokenId?: string;
  createdBy: IMember;
  owner?: IMember;
  expireAt?: number;
  status?: string;

  // claim conditions
  supply: number;
  quantity: number;
  defaultPrice: number;
}

export interface IGetTicketsParams {
  order?: string[];
  page?: number;
  limit?: number;
  search?: string;
}
