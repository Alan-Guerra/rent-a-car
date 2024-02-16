import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../infrastructure-persistance/entities/user.entity';
import { CreateUserDto } from '../../controllers/dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  createUser(user: CreateUserDto) {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  getAllUsers() {
    return this.userRepository.find();
  }

  getUser(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }
}
