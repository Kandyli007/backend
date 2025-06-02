import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
<<<<<<< HEAD
import { Article, ArticleSchema } from './article.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }])
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}

=======
import { Article, ArticleSchema } from './schemas/article.schema';


@Module({
  imports: [MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }])],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
>>>>>>> 8b86bf1f7480e60290e84e2fb197a13fe81dcb09
