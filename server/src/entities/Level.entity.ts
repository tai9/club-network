import { ILevel } from "@/types/Level";
import { Column, Entity } from "typeorm";
import { BaseEntity } from ".";

@Entity({
  name: "levels",
  orderBy: {
    targetPoint: "ASC",
  },
})
export class Level extends BaseEntity implements ILevel {
  @Column({
    type: "varchar",
  })
  name: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  description: string;

  @Column({
    type: "boolean",
    nullable: true,
    default: false,
  })
  status: boolean;

  @Column({
    type: "int",
  })
  targetPoint: number;
}
