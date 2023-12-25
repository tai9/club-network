import { IRole } from "./Role";
import { IBaseEntity, ReactionType } from "./common";

export interface IMember extends IBaseEntity {
  username: string;
  password: string;
  fullname?: string;
  email?: string;
  bio?: string;
  fbLink?: string;
  twitterLink?: string;
  insLink?: string;
  exp: number;
  loginCount: number;
  reactionCount?: {
    type: ReactionType;
    count: string;
  }[];
  postCount?: number;
  role?: IRole;
  roles?: IRole[];
}

export interface IGetMembersParams {
  memberIds?: number[];
  page?: number;
  limit?: number;
  search?: string;
  fromExp?: number;
  toExp?: number;
}
