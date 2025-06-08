// src/articles/dto/create-article.dto.ts
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  title: string;

  @IsString()
  authors: string;

  @IsOptional()
  @IsNumber()
  year?: number;

  @IsOptional()
  @IsString()
  sePractice?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  claim?: string;

  @IsOptional()
  @IsString()
  evidence?: string;

  @IsOptional()
  @IsString()
  participants?: string;

  // ← 新增这两行
  @IsString()
  excerpt: string;

  @IsString()
  content: string;
}


