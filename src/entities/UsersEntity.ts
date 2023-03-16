import { Type } from "class-transformer";
import { UserEntity } from "./UserEntity.js";

export class UsersEntity {
    @Type(() => UserEntity)
    users: UserEntity[];

    constructor(...users: UserEntity[]) {
        this.users = users;
    }

    getByEmail(email: string) {
        return Object.assign(this.users).find(
            (user: UserEntity) => user.email == email
        );
    }
}
