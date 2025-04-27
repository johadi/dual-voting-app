import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { Vote, Choice } from './vote.entity';
import { Comment } from './comment.entity';
import { User } from '../auth/user.entity';
@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepo: Repository<Post>,
    @InjectRepository(Vote) private voteRepo: Repository<Vote>,
    @InjectRepository(Comment) private commentRepo: Repository<Comment>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}
  async createPost(imageA: string, imageB: string): Promise<Post> {
    const post = this.postRepo.create({ imageA, imageB });
    return this.postRepo.save(post);
  }
  async findAll() {
    const posts = await this.postRepo.find({ relations: ['votes', 'comments'] });
    return posts.map(post => ({
      id: post.id, imageA: post.imageA, imageB: post.imageB,
      votesA: post.votes.filter(v => v.choice==='A').length,
      votesB: post.votes.filter(v => v.choice==='B').length,
      comments: post.comments.map(c=>({ id: c.id, content: c.content, username: c.user.username,
        profileImage: c.user.profileImage, createdAt: c.createdAt })),
    }));
  }
  async vote(postId: string, choice: Choice, userId: string) {
    const post = await this.postRepo.findOne({ where:{id:postId} });
    if(!post) throw new NotFoundException('Post not found');
    let vote = await this.voteRepo.findOne({ where:{ post:{id:postId}, user:{id:userId} } });
    if(vote) vote.choice = choice;
    else {
      const user = await this.userRepo.findOne({ where:{id:userId} });
      vote = this.voteRepo.create({ choice, post, user });
    }
    await this.voteRepo.save(vote);
    return this.getVoteCounts(postId);
  }
  async getVoteCounts(postId:string) {
    const votes = await this.voteRepo.find({where:{ post:{id:postId} }});
    return { votesA: votes.filter(v=>v.choice==='A').length, votesB: votes.filter(v=>v.choice==='B').length };
  }
  async addComment(postId:string, content:string, userId:string) {
    const post = await this.postRepo.findOne({ where:{id:postId} });
    const user = await this.userRepo.findOne({ where:{id:userId} });
    if(!post||!user) throw new NotFoundException('Post or user not found');
    const comment = this.commentRepo.create({ content, post, user });
    return this.commentRepo.save(comment);
  }
  async getComments(postId:string) {
    const comments = await this.commentRepo.find({ where:{ post:{id:postId} }, relations:['user'] });
    return comments.map(c=>({ id:c.id, content:c.content, username:c.user.username, createdAt:c.createdAt }));
  }
}