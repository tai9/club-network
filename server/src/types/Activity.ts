import { IBaseEntity } from "./common";

export type ActivityType = "LOGIN" | "LOGOUT" | "COMMENT" | "BADGE" | "TICKET";

export type ActivityStatus = "SUCCESS" | "FAIL";

export interface IActivity extends IBaseEntity {
  type: ActivityType;
  description?: string;
  status: ActivityStatus;
  createdBy: number;
  data?: string;
}
