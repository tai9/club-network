import { IMember } from "@/types/Member";
import { INotification } from "@/types/Notification";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity, Member } from ".";

@Entity({
  name: "notifications",
  orderBy: {
    createdAt: "DESC",
  },
})
export class Notification extends BaseEntity implements INotification {
  @Column({
    type: "varchar",
  })
  title: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  description: string;

  @Column({
    type: "boolean",
    default: false,
  })
  isRead: boolean;

  @Column({
    type: "varchar",
    nullable: true,
  })
  type: string;

  @ManyToOne(() => Member, (member) => member.id)
  @JoinColumn({ name: "createdBy" })
  @Column({
    type: "varchar",
    nullable: true,
  })
  createdBy: IMember;
}
