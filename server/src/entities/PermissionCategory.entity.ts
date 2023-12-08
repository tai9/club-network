import { IPermisionCategory } from "@/types/Permission";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: "permission_categories",
})
@Index(["name", "type"], { unique: true })
export class PermissionCategory implements IPermisionCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
  })
  name: string;

  @Column({
    type: "varchar",
  })
  type: string;
}
