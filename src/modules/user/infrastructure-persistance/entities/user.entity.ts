import { Rent } from "src/modules/rent/infrastructure-persistance/entities/rent.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity('Users')
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;
   
    @Column()
    firstName: string;

    @Column()
    lastName: string;
    
    @Column()
    document: number;
 
    @OneToMany(() => Rent, rent => rent.user)
    rents: Rent[];
}