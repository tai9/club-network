import { IBaseEntity } from "./common";

export interface IPost extends IBaseEntity {
  type?: string;
  content: string;
  media?: string;
  status?: string;
}

export interface IGetPostsParams {
  memberId: number;
}
