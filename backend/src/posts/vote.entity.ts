import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../auth/user.entity';
import { Post } from './post.entity';
export type Choice = 'A' | 'B';
@Entity()
export class Vote {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ type: 'enum', enum: ['A', 'B'] }) choice: Choice;
  @ManyToOne(() => User, user => user.votes) user: User;
  @ManyToOne(() => Post, post => post.votes) post: Post;
}