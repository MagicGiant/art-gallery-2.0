import { Controller, Get, Render, Res } from '@nestjs/common';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {

  constructor(private readonly reviewsService: ReviewsService){
  }

  @Get()
  @Render('reviews')
  public async getGallery(@Res() res) {
    return {
      route: 'reviews',
      isLogin: this.reviewsService.isLogin,
      isAdmin: this.reviewsService.isAdmin
    };
  }
}
