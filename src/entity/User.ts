import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {

  static fromObject(name, password){
    const user = new User();
    user.name = name;
    user.password = password;

    return user;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column('text')
  password: string;
}