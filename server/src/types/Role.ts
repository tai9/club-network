import { IBaseEntity } from "./common";

export interface IRole extends IBaseEntity {
  name: string;
  description?: string;
  status: boolean;
  grade: number;
  createdBy: number;
  permissionIds: number[];
}
