import { IMember } from "@/types/Member";
import { ITicket } from "@/types/Ticket";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity, Member } from ".";

@Entity({
  name: "tickets",
  orderBy: {
    createdAt: "DESC",
  },
})
export class Ticket extends BaseEntity implements ITicket {
  @Column({
    type: "varchar",
  })
  name: string;

  @Column({
    type: "varchar",
  })
  image: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  description: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  tokenId: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  expireAt: number;

  @Column({
    type: "varchar",
    nullable: true,
  })
  status: string;

  @Column({
    type: "int",
    default: 0,
  })
  supply: number;

  @Column({
    type: "int",
    default: 0,
  })
  quantity: number;

  @Column({
    type: "float",
    default: 0,
  })
  defaultPrice: number;

  @ManyToOne(() => Member, (member) => member.id)
  @JoinColumn({ name: "createdBy" })
  @Column({
    type: "varchar",
    nullable: true,
  })
  createdBy: IMember;

  @ManyToOne(() => Member, (member) => member.id)
  @JoinColumn({ name: "owner" })
  @Column({
    type: "varchar",
    nullable: true,
  })
  owner: IMember;
}
