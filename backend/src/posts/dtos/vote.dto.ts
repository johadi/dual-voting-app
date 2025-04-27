import { IsIn } from 'class-validator';
export class VoteDto { @IsIn(['A','B']) choice:'A'|'B'; }