import {
  Body,
  Controller,
  Get,
  Render,
  Post,
  Redirect,
  Res,
  Param,
} from '@nestjs/common';

import { AuthorizationService } from './authorization.service';
import { User } from 'src/entity/User';
import { Message, MessageService} from '../message/message.service';

@Controller('auth')
export class AuthorizationController {
  constructor(
    private readonly authorizationService: AuthorizationService
  ) {}


  @Get()
  @Redirect('/auth/login')
  public async base()
  {}

  @Post('/out')
  @Redirect('/gallery')
  public async out(){
    console.log('logout');
    this.authorizationService.isLogin = false;
  }

  public async getRegistrationBase(message: Message){
    return {message}
  }

  @Get('sign-up')
  @Render('registration')
  public async getRegistration() {
    return this.getRegistrationBase(null);
  }

  @Get('sign-up/message/:id')
  @Render('registration')
  public async getRegistrationWithMessage(@Param('id') id: number) {
    return this.getRegistrationBase(MessageService.messagesById.get(Number(id)));
  }

  @Post('sign-up')
  public async registerUser(@Body() formData, @Res() res) {
    if (formData.password !== formData.retryPassword) {
      const msId = MessageService.DifferentPasswords();
      return res.redirect(
        `/auth/sign-up/message/${msId}`,
      );
    }

    if (await this.authorizationService.has(formData.name)){
      const msId = MessageService.UserAlreadyExists();
      return res.redirect(
        `/auth/sign-up/message/${msId}`,
      )
    }


    this.authorizationService.add(
      User.fromObject(formData.name, formData.password),
    );

    return res.redirect('/gallery');
  }

  @Get('login')
  @Render('login')
  public async getLogin() {}

  @Get('login/message/:id')
  @Render('login')
  public async getLoginWithMessage(@Param('id') id: number) {
    const message = MessageService.messagesById.get(Number(id));
    return {message};
  }

  @Post('login')
  public async loginUser(@Body() formData,  @Res() res) {
    const user: User = await this.authorizationService.findOneByName(formData.name);

    if (!user){
      return res.redirect(`/auth/login/message/${MessageService.UserNotExists()}`)
    }

    if (user.password != formData.password){
      return res.redirect(`/auth/login/message/${MessageService.DifferentPasswords()}`)
    }

    if (user.name === 'admin'){
      this.authorizationService.isAdmin = true;
    }

    this.authorizationService.isLogin = true;
    console.log('login');
    
    return res.redirect('/gallery');
  }
}
