import { Controller, Get, Render } from '@nestjs/common';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {

  constructor(private readonly uploadService: UploadService){}

  @Get()
  @Render('upload')
  async getUpload() {
    return {
      route: 'upload',
      isLogin: this.uploadService.isLogin,
      isAdmin: this.uploadService.isAdmin
    }
  }
}
