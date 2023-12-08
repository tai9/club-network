import { ActivityStatus, ActivityType, IActivity } from "@/types/Activity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { BaseEntity, Member } from ".";

@Entity({
  name: "activities",
  orderBy: {
    createdAt: "DESC",
  },
})
export class Activity extends BaseEntity implements IActivity {
  @Column({
    type: "varchar",
  })
  type: ActivityType;

  @Column({
    type: "varchar",
  })
  status: ActivityStatus;

  @Column({
    type: "varchar",
    nullable: true,
  })
  description: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  data: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  @ManyToOne(() => Member, (u) => u.id)
  @JoinColumn({
    name: "createdBy",
  })
  createdBy: number;
}
