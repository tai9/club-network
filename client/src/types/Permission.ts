import { IMember } from "./Member";
import { IBaseEntity } from "./common";

export interface IPermisionCategory {
  id: number;
  name: string;
  type: string;
}

export interface IPermision extends IBaseEntity {
  name: string;
  status: boolean;
  description?: string;
  // categories: PermissionType[];
  createdBy: IMember;
}
