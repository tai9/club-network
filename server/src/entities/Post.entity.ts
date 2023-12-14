import { IPost } from "@/types/Post";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity, Member, Comment, Reaction } from ".";

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
  createdBy: Member;

  @OneToMany(() => Comment, (c) => c.postId)
  @JoinColumn({ name: "comments" })
  comments: Comment[];

  @OneToMany(() => Reaction, (c) => c.postId)
  @JoinColumn({ name: "reactions" })
  reactions: Reaction[];
}
