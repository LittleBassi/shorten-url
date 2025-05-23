import { User } from "../../users/entities/user.entity";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";

@Entity("shortened_url")
@Unique(["shortenedCode", "deletedAt"])
@Unique(["url", "deletedAt"])
export class ShortenedUrl extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  url: string;

  @Column({ name: "shortened_code", length: 255 })
  shortenedCode: string;

  @Column({ name: "redirect_url", length: 255 })
  redirectUrl: string;

  @Column({ name: "view_count", default: 0 })
  viewCount: number;

  @ManyToOne(() => User, {
    nullable: true,
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
  })
  @JoinColumn({ name: "user_id" })
  user: User;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt?: Date;
}
