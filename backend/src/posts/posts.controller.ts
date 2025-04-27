import { Controller, Get, Post, Body, Param, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { PostsService } from './posts.service';
import { AuthGuard } from '@nestjs/passport';
import { VoteDto } from './dtos/vote.dto';
import { CommentDto } from './dtos/comment.dto';
import { GetUser } from '../common/get-user.decorator';
import { VotesGateway } from './votes.gateway';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService, private votesGateway: VotesGateway) {}
  @Get() getAll() { return this.postsService.findAll(); }
  @Post() @UseGuards(AuthGuard('jwt')) @UseInterceptors(FileFieldsInterceptor([{name:'imageA',maxCount:1},{name:'imageB',maxCount:1}]))
  create(@UploadedFiles() files:any) {
    const imgA = files.imageA[0].filename, imgB = files.imageB[0].filename;
    return this.postsService.createPost(imgA,imgB);
  }
  @Post(':id/vote') @UseGuards(AuthGuard('jwt'))
  async vote(@Param('id') id:string,@Body() dto:VoteDto,@GetUser('id') userId:string){
    const counts = await this.postsService.vote(id,dto.choice,userId);
    this.votesGateway.server.emit('vote',{postId:id,...counts});
    return counts;
  }
  @Get(':id/comments') getComments(@Param('id') id:string){return this.postsService.getComments(id);}
  @Post(':id/comments') @UseGuards(AuthGuard('jwt'))
  addComment(@Param('id') id:string,@Body() dto:CommentDto,@GetUser('id') userId:string){
    return this.postsService.addComment(id,dto.content,userId);
  }
}