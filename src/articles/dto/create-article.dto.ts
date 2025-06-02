import { IsString, IsOptional } from 'class-validator';

export class CreateArticleDto {
  title: string;
  authors: string;
  year?: number;
  sePractice?: string;
  claim?: string;
  evidence?: string;
  type?: string;
  participants?: string;
}

