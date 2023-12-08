import { Column, Entity, JoinColumn, OneToMany } from "typeorm";
import { BaseEntity } from "./Base.entity";
import { IMember } from "@/types/Member";
import { Role } from ".";

@Entity("members")
export class Member extends BaseEntity implements IMember {
  @Column({
    type: "varchar",
    unique: true,
  })
  username: string;

  @Column({
    type: "varchar",
  })
  password: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  fullname: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  email: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  bio: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  fbLink: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  twitterLink: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  insLink: string;

  @OneToMany(() => Role, (role) => role.createdBy)
  @JoinColumn()
  roles: Role[];
}
