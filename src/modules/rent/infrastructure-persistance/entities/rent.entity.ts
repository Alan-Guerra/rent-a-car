import { User } from "src/modules/user/infrastructure-persistance/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: 'Rents'})
export class Rent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    startDate: Date;

    @Column({ type: 'datetime' })
    endDate?: Date;

    @Column({ type: 'datetime' })
    returnDate?: Date;

    @Column()
    approvalStatus: boolean;

    @ManyToOne(() => User, user => user.rents)
    user: User;

    /*
    @Column()
    admin?: any;
    */
}