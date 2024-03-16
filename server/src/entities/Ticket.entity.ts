import { IMember } from "@/types/Member";
import { ITicket, TicketStatus, TicketType } from "@/types/Ticket";
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
  status: TicketStatus;

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

  @Column({
    type: "varchar",
    nullable: true,
  })
  checkoutUrl: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  type: TicketType;

  @ManyToOne(() => Member, {
    eager: true,
  })
  @JoinColumn({ name: "createdBy" })
  @Column({
    type: "int",
    nullable: true,
  })
  createdBy: Member;

  @ManyToOne(() => Member, {
    eager: true,
  })
  @JoinColumn({ name: "owner" })
  @Column({
    type: "int",
    nullable: true,
  })
  owner: Member;
}
