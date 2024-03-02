import { Body, Controller, Get, HttpException, Param, ParseIntPipe, Post, Delete, Put } from "@nestjs/common";
import { CarService } from "../application/service/car.service";
import { CreateCarDto } from "./dto/create_car.dto";
import { Car } from "../infrastructure-persistance/car.entity";
import { UpdateCarDto } from "./dto/update_car.dto";

@Controller("car")
export class CarController {
    constructor(private readonly carService: CarService) { }

    @Post()
    createCar(@Body() newCar: CreateCarDto): Promise<Car | HttpException> {
        return this.carService.createCar(newCar);
    }

    @Get(":id")
    getCar(@Param("id", ParseIntPipe) id: number): Promise<Car | HttpException> {
        return this.carService.getCar(id);
    }

    @Get()
    getAllCars(): Promise<Car[]> {
        return this.carService.getAllCars();
    }

    @Delete(":id")
    deleteCar(@Param("id", ParseIntPipe) id: number) {
        return this.carService.deleteCar(id);
    }

    @Put(":id")
    updateCar(
        @Param("id", ParseIntPipe) id: number,
        @Body() car: UpdateCarDto): Promise<Car | HttpException> {
        return this.carService.updateCar(id, car);
    }
}