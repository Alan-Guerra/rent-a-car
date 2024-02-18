import { Controller, Post, Get, Body, HttpException } from "@nestjs/common";
import { RentService } from "../application/service/rent.service";
import { NewRentDto } from "./dto/new_rent.dto";
import { Rent } from "../infrastructure-persistance/entities/rent.entity";


@Controller("rent")
export class RentController {
    constructor(private readonly rentService: RentService) { }

    @Post()
    newRent(@Body() newRent: NewRentDto): Promise<Rent | HttpException> {
        return this.rentService.newRent(newRent);
    }

    @Get()
    getAllRents() {
        return this.rentService.getAllRents();
    }
}