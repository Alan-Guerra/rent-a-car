import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Car } from "../../infrastructure-persistance/car.entity";
import { Repository } from "typeorm";
import { NewCarDto } from "../../controllers/dto/new_car.dto";

@Injectable()
export class CarService {
    constructor(
        @InjectRepository(Car)
        private carRepository: Repository<Car>
    ) {}
}