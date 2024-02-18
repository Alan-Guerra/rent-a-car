import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rent } from '../../infrastructure-persistance/entities/rent.entity';
import { UserService } from 'src/modules/user/application/service/user.service';
import { NewRentDto } from 'src/modules/rent/controllers/dto/new_rent.dto';

@Injectable()
export class RentService {
  constructor(
    @InjectRepository(Rent)
    private rentRepository: Repository<Rent>,
    private userService: UserService
  ) {}

    async newRent(rent: NewRentDto){
      const userFound = await this.userService.getUser(rent.userId);

      if (!userFound){
        return new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      // SEARCH ADMIN!!

      if (!rent.approvalStatus){
        return new HttpException('Not approved', HttpStatus.CONFLICT);
      }
      
      const newRent = this.rentRepository.create(rent);
      return await this.rentRepository.save(newRent);
    }

    getAllRents(){
      return this.rentRepository.find();
    }


}
