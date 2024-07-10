import { Controller, Get, Param, Redirect, Render } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { AuthorizationService } from '../authorization/authorization.service';
import { Message, MessageService } from '../message/message.service';

@Controller('gallery')
export class GalleryController {

  constructor(private readonly galleryService: GalleryService) {}

  public async getGalleryBase(message: Message){
    const albums = await this.galleryService.getAlbums(5, 4);
    const isLogin = this.galleryService.isLogin;
    console.log(isLogin);
    
    return {
      albums,
      route: 'gallery',
      isLogin,
      isAdmin: this.galleryService.isAdmin,
      message,
    };
  }

  @Get('message/:id')
  @Render('index')
  public async getGalleryWithMessage(@Param('id') id: number){
    return await this.getGalleryBase(MessageService.messagesById.get(Number(id)))
  }

  @Get()
  @Render('index')
  public async getGallery() {
    return await this.getGalleryBase(null);
  }

}
