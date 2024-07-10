import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { AuthorizationModule } from '../authorization/authorization.module';
import { ReviewsService } from './reviews.service';

@Module({
  imports: [AuthorizationModule],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewModule {}
