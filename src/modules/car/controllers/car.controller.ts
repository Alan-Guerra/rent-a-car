import { Controller } from "@nestjs/common";
import { CarService } from "../application/service/car.service";

@Controller("cars")
export class CarController {
    constructor(private readonly carService: CarService) {}
}