import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Vote } from './vote.entity';
import { Comment } from './comment.entity';
@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column() imageA: string;
  @Column() imageB: string;
  @OneToMany(() => Vote, vote => vote.post) votes: Vote[];
  @OneToMany(() => Comment, comment => comment.post) comments: Comment[];
}