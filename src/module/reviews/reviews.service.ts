import { Injectable } from '@nestjs/common';
import { AuthorizationService } from '../authorization/authorization.service';

@Injectable()
export class ReviewsService {
  constructor(private readonly authorizationService: AuthorizationService){}

  public get isLogin(): Boolean{
    return this.authorizationService.isLogin;
  }

  public get isAdmin(): Boolean{
    return this.authorizationService.isAdmin;
  }
}