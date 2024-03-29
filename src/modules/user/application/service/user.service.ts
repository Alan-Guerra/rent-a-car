import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from '../../infrastructure-persistance/entities/user.entity';
import { CreateUserDto } from '../../controllers/dto/create-user.dto';
import { UpdateUserDto } from '../../controllers/dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async createUser(user: CreateUserDto) {

    const userFound = await this.userRepository.findOne({
      where:
        { username: user.username } || { document: user.document }
    })
    if (userFound) {
      return new HttpException('User already exist', HttpStatus.CONFLICT)
    }

    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  getAllUsers() {
    return this.userRepository.find({relations: ['rents']});
  }

  async getUser(id: number) {
    const userFound = await this.userRepository.findOne({ where: { id }, relations: ['rents'] });

    if (!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return userFound;
  }

  async getUserByUsername(username: string){
    const userFound = await this.userRepository.findOne({ where: { username }, relations: ['rents'] });
  
    if (!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  
    return userFound;
  }

  async deleteUser(id: number): Promise<DeleteResult | HttpException> {
    const userFound = await this.userRepository.findOne({ where: { id }});
  
    if (!userFound){
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  
    return this.userRepository.delete( { id });
  }

  async updateUser(id: number, user: UpdateUserDto): Promise<User | HttpException> {
    const userFound = await this.userRepository.findOne({where: { id }});

    if (!userFound){
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const updatedUser = Object.assign(userFound, user);
    await this.userRepository.save(userFound);
    return updatedUser;
  }
}
