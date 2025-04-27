import { IsString, MinLength } from 'class-validator';
export class CommentDto { @IsString() @MinLength(1) content:string; }