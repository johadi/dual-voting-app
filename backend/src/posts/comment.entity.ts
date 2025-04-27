import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../auth/user.entity';
import { Post } from './post.entity';
@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column() content: string;
  @CreateDateColumn() createdAt: Date;
  @ManyToOne(() => User, user => user.comments) user: User;
  @ManyToOne(() => Post, post => post.comments) post: Post;
}