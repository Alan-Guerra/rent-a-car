import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { Car } from "./infrastructure-persistance/car.entity";
import { CarService } from "./application/service/car.service";
import { CarController } from "./controllers/car.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Car])],
    providers: [CarService],
    controllers: [CarController],
    exports: [CarService]
})

export class CarModule{};