import { Lugar } from 'src/lugar/entities/lugar.entity';
import { Pais } from 'src/pais/entities/pais.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity('ciudades')
export class Ciudad {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ default: null, length: 1500 }) 
  descripcion: string;

  @Column({default: 0})
  puntuacion:number;

  @Column({default:'url'})
  url_image1: string;

  @Column({default:'url'})
  url_image2: string;

  @Column({default:'url'})
  url_image3: string;

  @Column({default:'url'})
  url_image4: string;

  @ManyToOne(() => Pais, pais => pais.ciudades)
  @JoinColumn({ name: 'id_pais' })
  pais: Pais;

  @OneToMany(() => Lugar, lugar => lugar.ciudad)
  lugares: Lugar[];

  constructor(nombre:string, descripcion:string, puntuacion:number){
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.puntuacion = puntuacion;
}

public getIdCiudad():number{
    return this.id;
}

public getNombre():string{
    return this.nombre;
}

public setNombre(nombre:string){
    this.nombre = nombre;
}
}

