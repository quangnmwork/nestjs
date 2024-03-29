import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ENTITIES } from './entity';
import { RoomEntity } from './room.entity';

export enum UserAuthRole {
  DEFAULT = 'default',
  GOOGLE = 'google',
}
@Entity(ENTITIES.USER)
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ default: false })
  isActive: boolean;

  @Column()
  password: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @Column({
    type: 'enum',
    enum: UserAuthRole,
    default: UserAuthRole.DEFAULT,
  })
  authenticationType: UserAuthRole;

  @ManyToOne(() => RoomEntity, (room) => room.users)
  room: RoomEntity;
}
