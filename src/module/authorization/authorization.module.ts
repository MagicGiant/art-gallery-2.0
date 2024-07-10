import { Module } from '@nestjs/common';
import { AuthorizationController } from './authorization.controller';
import { AuthorizationService } from './authorization.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/User';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthorizationController],
  providers: [AuthorizationService],
  exports: [AuthorizationService]
})
export class AuthorizationModule {}
