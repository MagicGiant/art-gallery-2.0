import { Injectable } from '@nestjs/common';
import { AuthorizationService } from '../authorization/authorization.service';

@Injectable()
export class UploadService {
  constructor(private readonly authorizationService: AuthorizationService){
  }

  public get isLogin(){
    return this.authorizationService.isLogin;
  }

  public get isAdmin(){
    return this.authorizationService.isAdmin;
  }
}