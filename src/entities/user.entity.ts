import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IsString, IsStrongPassword, IsEmail } from 'class-validator';
import { Schedule } from './schedule.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  lastName: string | null;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  @OneToMany(() => Schedule, (schedule) => schedule.creator)
  schedules: Schedule[];
}

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsEmail()
  email: string;

  @IsStrongPassword({ minLength: 6 })
  password: string;
}
