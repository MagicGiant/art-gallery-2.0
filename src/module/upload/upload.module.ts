import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { AuthorizationModule } from '../authorization/authorization.module';
import { UploadService } from './upload.service';

@Module({
  imports: [AuthorizationModule],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
