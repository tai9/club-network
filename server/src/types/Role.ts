import { IBaseEntity } from "./common";

export interface IRole extends IBaseEntity {
  name: string;
  description?: string;
  status: boolean;
  createdBy: number;
  permissionIds: number[];
}
