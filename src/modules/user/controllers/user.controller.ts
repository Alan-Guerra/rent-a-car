import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from '../application/service/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../infrastructure-persistance/entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() newUser: CreateUserDto): Promise<User | null> {
    return this.userService.createUser(newUser);
  }

  @Get()
  getAllUsers(): Promise<User[]>{
    return this.userService.getAllUsers();
  }

  @Get(":id")
  getUser(@Param("id", ParseIntPipe) id: number): Promise<User>{
    return this.userService.getUser(id);
  }
}
