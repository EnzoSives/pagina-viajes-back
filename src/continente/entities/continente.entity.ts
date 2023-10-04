import { Pais } from 'src/pais/entities/pais.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity('continentes')
export class Continente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @OneToMany(() => Pais, pais => pais.continente)
  paises: Pais[];

  constructor(nombre:string){
    this.nombre = nombre;
}

public getIdContinente():number{
    return this.id;
}

public getNombre():string{
    return this.nombre;
}

public setNombre(nombre:string){
    this.nombre = nombre;
}
}
