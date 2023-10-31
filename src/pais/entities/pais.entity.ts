import { Ciudad } from 'src/ciudad/entities/ciudad.entity';
import { Continente } from 'src/continente/entities/continente.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';


@Entity('paises')
export class Pais {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null})
  nombre: string;

  @Column({ default: null})
  descripcion: string;
  
  @Column()
  url_image: string;

  @Column({ default: 0})
  puntuacion: number;

  @OneToMany(() => Ciudad, ciudad => ciudad.pais)
  ciudades: Ciudad[];

  @ManyToOne(() => Continente, continente => continente.paises)
  @JoinColumn({ name: 'id_continente' })
  continente: Continente;

  constructor(nombre: string, descripcion: string, url_image: string, puntuacion: number) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.url_image = url_image;
    this.puntuacion = puntuacion
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

