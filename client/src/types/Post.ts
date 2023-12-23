import { IComment } from "./Comment";
import { IMember } from "./Member";
import { IReaction } from "./Reaction";
import { IBaseEntity } from "./common";

export interface IPost extends IBaseEntity {
  type?: string;
  content: string;
  media?: string;
  status?: string;
  createdBy: IMember;
  reactions: IReaction[];
  comments: IComment[];
}

export interface IGetPostsParams {
  memberId?: number;
  memberIds?: number[];
  page?: number;
  limit?: number;
  search?: string;
  from?: string;
  to?: string;
}
