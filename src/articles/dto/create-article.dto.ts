
import { 
  IsString, 
  IsNotEmpty, 
  IsOptional, 
  IsNumber 
} from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  authors: string;

  @IsNumber()
  @IsOptional()
  year?: number;

  @IsString()
  @IsOptional()
  sePractice?: string;

  @IsString()
  @IsOptional()
  claim?: string;

  @IsString()
  @IsOptional()
  evidence?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  participants?: string;

  @IsString()
  @IsNotEmpty()
  excerpt: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}



