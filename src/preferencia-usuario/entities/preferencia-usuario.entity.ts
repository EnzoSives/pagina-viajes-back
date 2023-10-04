import { Lugar } from 'src/lugar/entities/lugar.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('preferencias')
export class PreferenciaUsuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  puntaje: number;

  @ManyToOne(() => User, user => user.preferencias)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Lugar, lugar => lugar.preferenciaUsuario)
  @JoinColumn({ name: 'lugar_id' })
  lugar: Lugar;
}
