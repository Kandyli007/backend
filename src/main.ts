import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

 
  app.enableCors({
      // in here  it will enable CORS for the frontend origin
    
    origin: process.env.FRONTEND_URL || '*',
    credentials: false,
  });


  app.useGlobalPipes(
     // and then use ValidationPipe for DTO validation
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

 
  const port = parseInt(process.env.PORT, 10) || 3000;
    // and here is to listen on the environment’s PORT (Render provides this), or default to 3000/3001
  await app.listen(port);

  console.log(`Backend is running on port ${port}`);
}

bootstrap();


