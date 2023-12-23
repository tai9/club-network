import { IComment } from "./Comment";
import { IMember } from "./Member";
import { IReaction } from "./Reaction";
import { IBaseEntity, ICount } from "./common";

export interface IPost extends IBaseEntity {
  type?: string;
  content: string;
  media?: string;
  status?: string;
  isLiked?: boolean;
  createdBy: IMember;
  reactions: IReaction[];
  comments: IComment[];
  reactionCount?: ICount[];
  commentCount?: number;
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
