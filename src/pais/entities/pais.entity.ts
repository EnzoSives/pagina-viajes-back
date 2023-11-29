import { Ciudad } from 'src/ciudad/entities/ciudad.entity';
import { Continente } from 'src/continente/entities/continente.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';


@Entity('paises')
export class Pais {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null})
  nombre: string;

  @Column({ default: null, length: 1500}) 
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

  @OneToMany(() => Ciudad, ciudad => ciudad.pais)
  ciudades: Ciudad[];

  @ManyToOne(() => Continente, continente => continente.paises)
  @JoinColumn({ name: 'id_continente' })
  continente: Continente;

  constructor(nombre: string, descripcion: string, puntuacion:number) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.puntuacion = puntuacion;
    
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

