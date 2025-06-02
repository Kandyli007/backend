import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
  app.enableCors({
     // here enable CORS for the frontend origin
    origin: process.env.FRONTEND_URL || '*',  
    // and allow all origins if FRONTEND_URL not set
    credentials: false
  });
 
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
  // also use validation pipe if DTOs have validation decorators
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Backend is running on port ${port}`);
}
bootstrap();

