import { IBaseEntity } from "./common";

export interface IMember extends IBaseEntity {
  username: string;
  password: string;
  fullname?: string;
  email?: string;
  bio?: string;
  fbLink?: string;
  twitterLink?: string;
  insLink?: string;
}
