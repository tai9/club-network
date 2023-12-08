import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { BaseEntity, Member, PermissionCategory } from ".";
import { IPermision } from "@/types/Permission";

@Entity({
  name: "permissions",
  orderBy: {
    createdAt: "DESC",
  },
})
export class Permission extends BaseEntity implements IPermision {
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
  })
  status: boolean;

  @Column({
    type: "int",
    array: true,
    nullable: true,
  })
  @OneToMany(() => PermissionCategory, (cate) => cate.id)
  @JoinColumn({
    name: "categories",
  })
  categories: PermissionCategory[];

  @OneToOne(() => Member)
  @JoinColumn({
    name: "createdBy",
  })
  @Column({
    type: "varchar",
    nullable: true,
  })
  createdBy: Member;
}
