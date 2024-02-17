import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rent } from './modules/rent/infrastructure-persistance/entities/rent.entity';
import { User } from './modules/user/infrastructure-persistance/entities/user.entity';
import { UserModule } from './modules/user/user.module';
import { RentModule } from './modules/rent/rent.module';

@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'rentacarPass',
      database: 'rentacarDB',
      entities: [User, Rent],
      synchronize: true,
      autoLoadEntities: true,
  }),
  UserModule, RentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
