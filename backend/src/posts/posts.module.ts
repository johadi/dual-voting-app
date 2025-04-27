import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post } from './post.entity';
import { Vote } from './vote.entity';
import { Comment } from './comment.entity';
import { VotesGateway } from './votes.gateway';
import { AuthModule } from '../auth/auth.module';
import { User } from '../auth/user.entity';
@Module({
  imports: [
    MulterModule.register({ dest: './static/images' }),
    TypeOrmModule.forFeature([Post, Vote, Comment, User]),
    AuthModule,
  ],
  providers: [PostsService, VotesGateway],
  controllers: [PostsController],
})
export class PostsModule {}