import { IPost } from "@/types/Post";
import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity, Member, Post } from ".";
import { IComment } from "@/types/Comment";

@Entity({
  name: "comments",
  orderBy: {
    createdAt: "ASC",
  },
})
export class Comment extends BaseEntity implements IComment {
  @Column({
    type: "varchar",
  })
  content: string;

  @ManyToOne(() => Member, (member) => member.id)
  @JoinColumn({ name: "memberId" })
  @Column({
    type: "int",
  })
  memberId: number;

  @ManyToOne(() => Post, (post) => post.id, {
    onDelete: "CASCADE",
  })
  @Column({
    type: "int",
  })
  postId: number;

  @ManyToOne(() => Member, (member) => member.id)
  @JoinColumn({ name: "createdBy" })
  createdBy: Member;
}
