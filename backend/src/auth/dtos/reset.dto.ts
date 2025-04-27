import { IsString, MinLength } from 'class-validator';
export class ResetDto {
  @IsString() username: string;
  @IsString() @MinLength(6) password: string;
}