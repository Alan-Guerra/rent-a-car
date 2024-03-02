import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Rent } from "src/modules/rent/infrastructure-persistance/entities/rent.entity";

@Entity({name: "Car"})
export class Car{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    license: string;

    @Column()
    brand: string;

    @Column()
    image?: string;

   @OneToMany(() => Rent, rent => rent.car)
    rents: Rent[];
}