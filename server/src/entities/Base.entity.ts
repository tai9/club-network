import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export interface IBaseEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export class BaseEntity implements IBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "NOW()",
  })
  updatedAt: Date;
}
