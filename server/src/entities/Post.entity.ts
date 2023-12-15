import { IPost } from "@/types/Post";
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { BaseEntity, Comment, Member, Reaction } from ".";
import { IMember } from "@/types/Member";

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

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Member, (user) => user.id)
  @JoinColumn({ name: "createdBy" })
  createdBy: Member;

  @OneToMany(() => Comment, (c) => c.postId)
  comments: Comment[];

  @OneToMany(() => Reaction, (c) => c.postId)
  reactions: Reaction[];
}
