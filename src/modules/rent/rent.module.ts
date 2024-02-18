import { TypeOrmModule } from '@nestjs/typeorm'
import { Rent } from './infrastructure-persistance/entities/rent.entity';
import { Module } from '@nestjs/common';
import { RentService } from './application/service/rent.service';
import { RentController } from './controllers/rent.controller';
import { UserModule } from '../user/user.module';

@Module({
    imports: [TypeOrmModule.forFeature([Rent]), UserModule],
    providers: [RentService],
    controllers: [RentController],
    exports: [RentService]
})

export class RentModule{};