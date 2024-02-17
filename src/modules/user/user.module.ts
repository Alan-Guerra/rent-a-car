import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './infrastructure-persistance/entities/user.entity';
import { Module } from '@nestjs/common';
import { UserService } from './application/service/user.service';
import { UserController } from './controllers/user.controller';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService]
})

export class UserModule{};