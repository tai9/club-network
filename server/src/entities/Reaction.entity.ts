import { IReaction } from "@/types/Reaction";
import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity, Member, Post } from ".";

@Entity({
  name: "reactions",
  orderBy: {
    createdAt: "DESC",
  },
})
@Index(["type", "postId", "memberId"], { unique: true })
export class Reaction extends BaseEntity implements IReaction {
  @Column({
    type: "varchar",
  })
  type: string;

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
}
