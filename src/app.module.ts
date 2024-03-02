import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rent } from './modules/rent/infrastructure-persistance/entities/rent.entity';
import { User } from './modules/user/infrastructure-persistance/entities/user.entity';
import { Car } from './modules/car/infrastructure-persistance/car.entity';
import { UserModule } from './modules/user/user.module';
import { RentModule } from './modules/rent/rent.module';
import { CarModule } from './modules/car/car.module';

@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'rentacarpass',
      database: 'rentacar',
      entities: [User, Rent, Car],
      synchronize: true,
      autoLoadEntities: true,
  }),
  UserModule, RentModule, CarModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
