import { IBaseEntity } from "./common";

export interface IReaction extends IBaseEntity {
  type?: string;
  memberId: number;
  postId: number;
}
