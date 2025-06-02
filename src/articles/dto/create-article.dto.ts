import { IsString, IsOptional } from 'class-validator';

export class CreateArticleDto {
<<<<<<< HEAD
  title: string;
  authors: string;
  year?: number;
  sePractice?: string;
  claim?: string;
  evidence?: string;
  type?: string;
  participants?: string;
}

=======
  @IsString()
  title: string;
  @IsString()
  @IsOptional()
  authors?: string;

  @IsString()
  @IsOptional()
  abstract?: string;
}
>>>>>>> 8b86bf1f7480e60290e84e2fb197a13fe81dcb09
