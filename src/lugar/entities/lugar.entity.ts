import { Ciudad } from 'src/ciudad/entities/ciudad.entity';
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

  @ManyToOne(() => Ciudad, (ciudad) => ciudad.lugares)
  @JoinColumn({ name: 'id_ciudad' })
  ciudad: Ciudad;

  @OneToMany(
    () => PreferenciaUsuario,
    (preferenciaUsuario) => preferenciaUsuario.lugar,
  )
  preferenciaUsuario: PreferenciaUsuario[];

  constructor(nombre: string) {
    this.nombre = nombre;
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
