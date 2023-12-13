import { IBaseEntity } from "./common";

export interface IBadge extends IBaseEntity {
  name: string;
  description?: string;
  status: boolean;
  memberId: number;
}
