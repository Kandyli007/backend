
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [

    ConfigModule.forRoot({
      //in here is will load the .env file
      isGlobal: true,
      envFilePath: '.env',
    }),

    MongooseModule.forRootAsync({
      //and then fetch the mongodb_uri
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        const uri = config.get<string>('MONGODB_URI');
        console.log('MONGODB_URI =', uri);
        return { uri };
      },
      inject: [ConfigService],
    }),
    ArticlesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


