import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // here is will connect to MongoDB using MONGODB_URI from environment
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ArticlesModule,
  ],
})
export class AppModule {}
