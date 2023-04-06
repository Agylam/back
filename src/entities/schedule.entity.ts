// TODO: create module for schedules
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { IsString, IsOptional, IsEnum } from 'class-validator';
import { UserEntity } from '../users/users.entity';

export enum Weekday {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday',
}

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  description: string | null;

  @Column({ type: 'enum', enum: Weekday })
  weekday: Weekday;

  @Column()
  start: string;

  @Column()
  end: string;

  @ManyToOne(() => UserEntity, (user) => user.schedules)
  creator: UserEntity;
}

export class CreateScheduleDto {
  @IsString()
  @IsOptional()
  description: string | null;

  @IsEnum(Weekday)
  weekday: Weekday;

  @IsString()
  start: string;

  @IsString()
  end: string;
}
