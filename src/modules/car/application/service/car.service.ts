import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Car } from "../../infrastructure-persistance/car.entity";
import { Repository } from "typeorm";
import { CreateCarDto } from "../../controllers/dto/create_car.dto";
import { UpdateCarDto } from "../../controllers/dto/update_car.dto";

@Injectable()
export class CarService {
    constructor(
        @InjectRepository(Car)
        private carRepository: Repository<Car>
    ) { }

    async createCar(car: CreateCarDto) {
        const carFound = await this.carRepository.findOne({
            where: { license: car.license }
        })
        if (carFound) {
            return new HttpException("Car already exist", HttpStatus.CONFLICT)
        }
        const newCar = this.carRepository.create(car);
        return this.carRepository.save(newCar);
    }

    getAllCars() {
        return this.carRepository.find({ relations: ["rents"] });
    }

    async getCar(id: number) {
        const carFound = await this.carRepository.findOne({ where: { id } });
        if (!carFound) {
            throw new HttpException("Car not found", HttpStatus.NOT_FOUND);
        }
        return carFound;
    }

    async deleteCar(id: number) {
        const carFound = await this.getCar(id);
        await this.carRepository.delete({ id });
        return carFound;
    }

    async updateCar(id: number, car: UpdateCarDto): Promise<Car | HttpException> {
        const carFound = await this.getCar(id);
        const updatedCar = Object.assign(carFound, car);
        await this.carRepository.save(carFound);
        return updatedCar;

    }
}