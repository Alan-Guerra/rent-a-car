import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { Car } from "./infrastructure-persistance/car.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Car])],
    providers: [],
    controllers: [],
    exports: []
})

export class CarModule{};