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
  reactionCount?: {
    type: ReactionType;
    count: string;
  }[];
  postCount?: number;
}
