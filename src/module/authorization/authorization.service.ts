import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/User';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorizationService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public isLogin = false;

  public isAdmin = false;

  public async findOne(id: number): Promise<User>{
    return this.userRepository.findOne({
      where:{
        id
      }
    });
  }

  public async findOneByName(name: string): Promise<User>{
    return this.userRepository.findOne({
      where:{
        name
      }
    })
  }

  public async has(name: string): Promise<Boolean>{
    return await this.findOneByName(name) != null;
  }

  public async add(user: User){
    return this.userRepository.save(user);
  }
}