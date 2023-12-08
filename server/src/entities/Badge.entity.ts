import { IBadge } from "@/types/Badge";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity, Member } from ".";

@Entity({
  name: "badges",
  orderBy: {
    createdAt: "DESC",
  },
})
export class Badge extends BaseEntity implements IBadge {
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
  })
  status: boolean;

  @ManyToOne(() => Member, (user) => user.id)
  @JoinColumn({ name: "createdBy" })
  @Column({
    type: "varchar",
    nullable: true,
  })
  createdBy: number;
}
