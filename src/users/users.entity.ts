import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert,
  AfterLoad,
  BeforeUpdate,
} from 'typeorm';
import { Schedule } from '../entities/schedule.entity';
import { IsEmail } from 'class-validator';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcryptjs';

export enum Groups {
  Director = 'Director',
  Teacher = 'Teacher',
  Root = 'Root',
}

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: Groups,
    default: Groups.Teacher,
  })
  group: Groups;

  @Column()
  firstName: string;

  @Column({ default: '' })
  lastName: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Exclude({ toPlainOnly: true })
  password: string;

  @Exclude({ toPlainOnly: true })
  previousPassword: string;

  @AfterLoad()
  loadPreviousPassword(): void {
    this.previousPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword() {
    if (this.previousPassword !== this.password && this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  @OneToMany(() => Schedule, (schedule) => schedule.creator)
  schedules: Schedule[];
}
