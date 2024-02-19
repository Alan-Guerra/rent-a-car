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
  ) { }

  async newRent(rent: NewRentDto) {
    const userFound = await this.userService.getUser(rent.userId);

    if (!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (!rent.approvalStatus) {
      return new HttpException('Not approved', HttpStatus.CONFLICT);
    }

    const newRent = this.rentRepository.create(rent);
    return await this.rentRepository.save(newRent);
  }

  getAllRents() {
    return this.rentRepository.find();
  }


  async endRent(id: number) {
    const rentFound = await this.rentRepository.findOne({ where: { id } });

    if (!rentFound) {
      return new HttpException('Rent not found', HttpStatus.NOT_FOUND);
    }

    rentFound.endDate = new Date();
    await this.rentRepository.save(rentFound);
    return rentFound;

  }

  async deleteRent(id: number) {
    const rentFound = await this.rentRepository.findOne({ where: { id } });

    if (!rentFound) {
      return new HttpException('Rent not found', HttpStatus.NOT_FOUND);
    }

    await this.rentRepository.delete({ id });
    return rentFound;
  }
  

}
