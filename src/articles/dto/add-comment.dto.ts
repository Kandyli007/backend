import { IsString, IsOptional } from 'class-validator';

export class AddCommentDto {
  @IsString()
  author: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  name?: string; // optional alias if needed
}
