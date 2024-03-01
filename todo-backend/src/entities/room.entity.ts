import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class RoomEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => UserEntity, (user) => user.room)
  users: UserEntity[];

  @Column()
  sizeOfRoom: 2 | 3 | 4;

  @Column()
  status: 'waiting' | 'in-game' | 'done';
}
