import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: 'Users'})
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

    
}