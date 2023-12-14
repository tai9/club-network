import { IMember } from "./Member";
import { IBaseEntity } from "./common";

export interface IComment extends IBaseEntity {
  type?: string;
  content: string;
  memberId: number;
  postId: number;
  createdBy: IMember;
}
