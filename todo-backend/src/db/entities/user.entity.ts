import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ENTITIES } from './entity';

@Entity(ENTITIES.USER)
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ default: false })
  isActive: boolean;
}
