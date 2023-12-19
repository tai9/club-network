import { IMember } from "./Member";
import { IBaseEntity } from "./common";

export interface INotification extends IBaseEntity {
  title: string;
  description?: string;
  isRead?: boolean;
  type: string;
  createdBy: IMember;
}
