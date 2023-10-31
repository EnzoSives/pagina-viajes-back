import { Pais } from 'src/pais/entities/pais.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('continentes')
export class Continente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null}) 
  nombre: string;

  @Column({ default: null})
  descripcion: string;

  @OneToMany(() => Pais, pais => pais.continente)
  paises: Pais[];

  constructor(nombre: string, descripcion: string) {
    this.nombre = nombre;
    this.descripcion = descripcion;
  }

  public getIdContinente(): number {
    return this.id;
  }

  public getNombre(): string {
    return this.nombre;
  }

  public setNombre(nombre: string) {
    this.nombre = nombre;
  }
}
