import { IsString } from 'class-validator';

export class AddCommentDto {
<<<<<<< HEAD
  name: string;
  comment: string;
}

=======
  @IsString()
  author: string;
  @IsString()
  content: string;
}
>>>>>>> 8b86bf1f7480e60290e84e2fb197a13fe81dcb09
