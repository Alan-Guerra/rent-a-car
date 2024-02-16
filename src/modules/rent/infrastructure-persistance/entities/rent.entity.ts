import { User } from "src/modules/user/infrastructure-persistance/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm"

@Entity()
export class Rent{
    @PrimaryColumn()
    id: number;

    @Column()
    type: string;

    @Column()
    brand: string;

    @Column()
    color: string;
}