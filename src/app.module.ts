import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticlesModule } from './articles/articles.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:wqrs8ZHP3U8i638k@article-platform.w8oopg8.mongodb.net/?retryWrites=true&w=majority&appName=article-platform'),
    ArticlesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
