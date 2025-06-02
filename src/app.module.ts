import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
=======
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';  
>>>>>>> 8b86bf1f7480e60290e84e2fb197a13fe81dcb09
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [
<<<<<<< HEAD
    ConfigModule.forRoot({ isGlobal: true }),
    // here is will connect to MongoDB using MONGODB_URI from environment
    MongooseModule.forRoot(process.env.MONGODB_URI),
=======
    ConfigModule.forRoot({ isGlobal: true }), 
    MongooseModule.forRoot(process.env.MONGODB_URI!),
>>>>>>> 8b86bf1f7480e60290e84e2fb197a13fe81dcb09
    ArticlesModule,
  ],
})
export class AppModule {}
