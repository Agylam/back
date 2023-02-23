import { Type } from 'class-transformer'
import { UserEntity } from './UserEntity';

export class UsersEntity {
  @Type(() => UserEntity)
  users: UserEntity[]

  constructor(...users: UserEntity[]) {
    this.users = users
  }
}