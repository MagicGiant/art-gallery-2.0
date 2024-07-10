import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const PORT = 3000;

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  
  app.setViewEngine('ejs');
  app.setBaseViewsDir(join(__dirname, '../src', 'view'));
  app.useStaticAssets(join(__dirname, '../src', 'public'));

  await app.listen(PORT);

  console.log(`server start in http://localhost:${PORT}`);
  
}
bootstrap();
