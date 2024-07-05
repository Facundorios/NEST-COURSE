import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {

    //Se crea una columna de id, la cual es un string y se genera automaticamente, y el formato del id es de tipo uuid
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'text',
        unique: true,
    })
    email:string

    @Column({
        type: 'text',
        nullable: false
    })
    password:string

    @Column({
        type: 'text',
        nullable: false
    })
    fullName:string

    @Column({
        type: 'boolean',
        default: false
    })
    isActive: boolean

    @Column({
        type: 'text',
        array: true,
        default: ['user'],
    })
    roles: string[]
}
