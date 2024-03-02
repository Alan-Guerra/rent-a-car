import { Car } from "src/modules/car/infrastructure-persistance/car.entity";
import { User } from "src/modules/user/infrastructure-persistance/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: 'Rents'})
export class Rent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    startDate: Date;

    @Column({ type: 'datetime', nullable: true })
    endDate?: Date;

    @Column({ type: 'datetime', nullable: true })
    returnDate?: Date;

    @Column()
    approvalStatus: boolean;

    @Column()
    userId: number;

    @ManyToOne(() => User, user => user.rents)
    user: User;

    @ManyToOne(() => Car, car => car.rents)
    car: Car;
}