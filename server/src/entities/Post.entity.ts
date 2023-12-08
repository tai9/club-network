import { IPost } from "@/types/Post";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity, Member } from ".";

@Entity({
  name: "posts",
  orderBy: {
    createdAt: "DESC",
  },
})
export class Post extends BaseEntity implements IPost {
  @Column({
    type: "varchar",
    nullable: true,
  })
  name: string;

  @Column({
    type: "varchar",
  })
  content: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  media: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  status: string;

  @ManyToOne(() => Member, (user) => user.id)
  @JoinColumn({ name: "createdBy" })
  @Column({
    type: "varchar",
    nullable: true,
  })
  createdBy: number;
}
