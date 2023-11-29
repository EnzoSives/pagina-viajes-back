import { Ciudad } from 'src/ciudad/entities/ciudad.entity';
import { Imagen } from 'src/imagenes/entities/imagen.entity';
import { PreferenciaUsuario } from 'src/preferencia-usuario/entities/preferencia-usuario.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity('lugares')
export class Lugar {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
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

  @ManyToOne(() => Ciudad, (ciudad) => ciudad.lugares)
  @JoinColumn({ name: 'id_ciudad' })
  ciudad: Ciudad;

  @OneToMany(() => Imagen, (imagen) => imagen.lugar)
  imagenes: Imagen[];
  
  @OneToMany(
    () => PreferenciaUsuario,
    (preferenciaUsuario) => preferenciaUsuario.lugar,
  )
  preferenciaUsuario: PreferenciaUsuario[];

  constructor(nombre: string, description: string, puntuacion:number) {
    this.nombre = nombre;
    this.descripcion = description;
    this.puntuacion = puntuacion;
  

  }

  public getIdLugar(): number {
    return this.id;
  }

  public getNombre(): string {
    return this.nombre;
  }

  public setNombre(nombre: string) {
    this.nombre = nombre;
  }
}
