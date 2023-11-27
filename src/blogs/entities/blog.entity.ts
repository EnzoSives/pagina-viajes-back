import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('blogs')
export class Blog {
    
    @PrimaryGeneratedColumn()
     id: number

    @Column()
     posteo:string

     @ManyToOne(() => User, user => user.blogs)
     @JoinColumn({ name: 'id_user' })
     user: User;

     constructor(posteo: string) {
        this.posteo = posteo;
     }

}
