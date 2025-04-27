import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Vote } from '../posts/vote.entity';
import { Comment } from '../posts/comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({ unique: true }) username: string;

  @Column() password: string;

  @OneToMany(() => Vote, vote => vote.user) votes: Vote[];

  @OneToMany(() => Comment, comment => comment.user) comments: Comment[];

  @Column({ nullable: true })
  profileImage: string | null;
}