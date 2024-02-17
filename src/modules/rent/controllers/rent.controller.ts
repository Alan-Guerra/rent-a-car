import { Controller } from "@nestjs/common";
import { RentService } from "../application/service/rent.service";


@Controller("rent")
export class RentController {
    constructor(private readonly rentService: RentService) { }
}