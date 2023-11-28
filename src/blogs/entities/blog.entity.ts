import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('blogs')
export class Blog {
    
    @PrimaryGeneratedColumn()
     id: number

    @Column()
     posteo:string

     @Column()
     nombre:string

     @ManyToOne(() => User, user => user.blogs)
     @JoinColumn({ name: 'id_user' })
     user: User;

     constructor(posteo: string, nombre:string) {
        this.posteo = posteo;
        this.nombre = nombre;
     }

}
