import { Role } from 'src/common/enum/rol.enum';
import { PreferenciaUsuario } from 'src/preferencia-usuario/entities/preferencia-usuario.entity'
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, DeleteDateColumn } from 'typeorm'

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true, nullable: false })
    username: string

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false, select: false })
    password: string;

    @DeleteDateColumn()
    deletedAt: Date; 

    @OneToMany(() => PreferenciaUsuario, preferenciaUsuario => preferenciaUsuario.user)
    preferencias: PreferenciaUsuario[];

    constructor(username:string, password:string, email:string){
        this.username = username;
        this.password = password;
        this.email = email;
    }
}
