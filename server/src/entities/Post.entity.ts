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

  @Column({
    type: "boolean",
    nullable: true,
  })
  isNotification: boolean;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Member, (user) => user.id)
  @JoinColumn({ name: "createdBy" })
  createdBy: Member;

  @OneToMany(() => Comment, (c) => c.postId, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "comments" })
  comments: Comment[];

  @OneToMany(() => Reaction, (c) => c.postId)
  reactions: Reaction[];
}
