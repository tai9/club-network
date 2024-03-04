import { IMember } from "./Member";
import { IBaseEntity } from "./common";

export interface ITicket extends IBaseEntity {
  name: string;
  image: string; // ipfs format
  description?: string;
  tokenId?: string;
  createdBy: IMember;
  owner: IMember;

  // claim conditions
  supply: number;
  quantity: number;
  defaultPrice: number;
}
