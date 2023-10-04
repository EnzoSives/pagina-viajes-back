import { PreferenciaUsuario } from 'src/preferencia-usuario/entities/preferencia-usuario.entity'
import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm'

@Entity()
export class User {
    
    @PrimaryGeneratedColumn()
     id: number

    @Column({unique: true})
     username:string

     @Column()
     password:string

     @Column()
     email:string

     @OneToMany(() => PreferenciaUsuario, preferenciaUsuario => preferenciaUsuario.user)
     preferencias: PreferenciaUsuario[];
}
