import { Lugar } from 'src/lugar/entities/lugar.entity';
import { Pais } from 'src/pais/entities/pais.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity('ciudades')
export class Ciudad {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @ManyToOne(() => Pais, pais => pais.ciudades)
  @JoinColumn({ name: 'id_pais' })
  pais: Pais;

  @OneToMany(() => Lugar, lugar => lugar.ciudad)
  lugares: Lugar[];

  constructor(nombre:string, descripcion:string){
    this.nombre = nombre;
    this.descripcion = descripcion;
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

