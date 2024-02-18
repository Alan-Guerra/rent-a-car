import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './infrastructure-persistance/entities/user.entity';
import { Module } from '@nestjs/common';
import { UserService } from './application/service/user.service';
import { UserController } from './controllers/user.controller';
import { RentModule } from '../rent/rent.module';

@Module({
    imports: [TypeOrmModule.forFeature([User]), RentModule],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService]
})

export class UserModule{};