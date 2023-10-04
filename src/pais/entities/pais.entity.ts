import { Ciudad } from 'src/ciudad/entities/ciudad.entity';
import { Continente } from 'src/continente/entities/continente.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';


@Entity('paises')
export class Pais {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => Ciudad, ciudad => ciudad.pais)
  ciudades: Ciudad[];

  @ManyToOne(() => Continente, continente => continente.paises)
  @JoinColumn({ name: 'id_continente' })
  continente: Continente;

  constructor(nombre: string) {
    this.nombre = nombre;
  }

  public getIdPais(): number {
    return this.id;
  }

  public getNombre(): string {
    return this.nombre;
  }

  public setNombre(nombre: string) {
    this.nombre = nombre;
  }
}

