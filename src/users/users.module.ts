import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users.entity';
import { IsExist } from 'src/utils/validators/is-exist.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exist.validator';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [IsExist, IsNotExist, UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
