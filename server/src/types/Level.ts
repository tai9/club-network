import { IBaseEntity } from "./common";

export interface ILevel extends IBaseEntity {
  name: string;
  description?: string;
  status: boolean;
  targetPoint: number;
}
