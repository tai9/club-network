import { IMember } from "./Member";
import { IBaseEntity, ICount } from "./common";

export interface IPost extends IBaseEntity {
  type?: string;
  content: string;
  media?: string;
  status?: string;
  reactionCount?: ICount[];
  commentCount?: number;
  isLiked?: boolean;
  isNotification: boolean;
  createdBy: IMember;
}

export interface IGetPostsParams {
  memberId?: number;
  memberIds?: number[];
  page?: number;
  limit?: number;
  search?: string;
  from?: string;
  to?: string;
  isNotification?: boolean;
}
