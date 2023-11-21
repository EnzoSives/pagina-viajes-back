import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Lugar } from 'src/lugar/entities/lugar.entity';

@Entity()
export class Imagen {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  urlimagen: string;

  @ManyToOne(() => Lugar, lugar => lugar.imagenes)
  @JoinColumn({ name: 'idLugar' })
  lugar: Lugar;

  constructor( urlimagen: string){
    this.urlimagen = urlimagen;

  }
}

