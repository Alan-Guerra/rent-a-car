import { User } from "src/modules/user/infrastructure-persistance/entities/user.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"

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

    @Column()
    userId: number;

    @ManyToOne(() => User, user => user.rents)
    user: User;

    /* 
   @OneToOne(() => Admin, admin => admin.approvedRents )
    admin: Admin;
    */
}