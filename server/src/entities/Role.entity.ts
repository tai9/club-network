import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity, Member, Permission } from ".";
import { IRole } from "@/types/Role";

@Entity({
  name: "roles",
  orderBy: {
    createdAt: "DESC",
  },
})
export class Role extends BaseEntity implements IRole {
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

  @OneToMany(() => Permission, (perm) => perm.id)
  @JoinColumn({ name: "permissionIds" })
  @Column({
    type: "int",
    array: true,
    nullable: true,
  })
  permissionIds: number[];
}
