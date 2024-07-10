import { Module } from '@nestjs/common';
import { GalleryController } from './gallery.controller';
import { AuthorizationModule } from '../authorization/authorization.module';
import { GalleryService } from './gallery.service';

@Module({
  imports: [AuthorizationModule],
  controllers: [GalleryController],
  providers: [GalleryService],
})
export class GalleryModule {}
