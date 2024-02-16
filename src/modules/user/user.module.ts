import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './infrastructure-persistance/entities/user.entity';
import { Module } from '@nestjs/common';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [],
    controllers: [],
    exports: []
})

export class UserModule{};