import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  
  constructor(@InjectRepository(User) private userRepository: Repository<User>){}
  
  create(user: CreateUserDto) {
    this.userRepository.findOne({
      where: {
        username: user.username
      }
    })
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }
 
  getUsers(){
    return this.userRepository.find()
  }

  getUser(id: number) {
    return this.userRepository.findOne({
      where:{
        id
      }
    }); 
  }

  deleteUser(id: number) {
    return this.userRepository.delete({id});
  }

  updateUser(id: number, user: UpdateUserDto) {
    return this.userRepository.update({id} , user);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
