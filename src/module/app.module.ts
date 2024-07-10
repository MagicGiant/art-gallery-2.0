import { Module } from '@nestjs/common';
import { GalleryModule } from './gallery/gallery.module';
import { ReviewModule } from './reviews/reviews.module';
import { AppController } from './app.controller';
import { AuthorizationModule } from './authorization/authorization.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/User';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    GalleryModule, 
    ReviewModule,
    AuthorizationModule,
    UploadModule,
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'Sherka',
    database: 'art-gallery',
    entities: [User],
    synchronize: true,
  })],
  controllers: [AppController],
})
export class AppModule {}
