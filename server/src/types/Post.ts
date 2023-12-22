import { IBaseEntity } from "./common";

export interface IPost extends IBaseEntity {
  type?: string;
  content: string;
  media?: string;
  status?: string;
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
